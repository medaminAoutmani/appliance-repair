import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not defined in .env.local');
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Check if MONGODB_URI contains placeholder
if (MONGODB_URI.includes('<db_password>')) {
  console.error('❌ MONGODB_URI contains placeholder <db_password>');
  console.error('💡 Please replace <db_password> with your actual MongoDB password in .env.local');
  throw new Error('MONGODB_URI contains placeholder. Please update .env.local with your actual password.');
}

// Helper function to encode password for MongoDB URI
function encodeMongoPassword(password: string): string {
  return encodeURIComponent(password);
}

// TypeScript now knows MONGODB_URI is a string after the check above
const connectionString: string = MONGODB_URI;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) {
    console.log('✅ Using existing MongoDB connection');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    console.log('🔄 Attempting to connect to MongoDB...');
    console.log('📍 Connection string:', connectionString.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')); // Hide credentials in logs

    cached.promise = mongoose.connect(connectionString, opts).then((mongoose) => {
      console.log('✅ MongoDB connected successfully');
      return mongoose;
    }).catch((error) => {
      console.error('❌ MongoDB connection error:', error);

      // Provide helpful error messages
      if (error.message && error.message.includes('bad auth')) {
        console.error('\n💡 AUTHENTICATION FAILED - Solutions:');
        console.error('   1. Verify your MongoDB username and password in .env.local');
        console.error('   2. Check MongoDB Atlas → Database Access → verify user credentials');
        console.error('   3. If password contains special characters, URL-encode them:');
        console.error('      - @ → %40, # → %23, $ → %24, % → %25, & → %26, + → %2B, = → %3D');
        console.error('   4. Consider creating a new database user with a simple password');
        console.error('   5. Make sure you restarted the server after updating .env.local');
        console.error('\n   See MONGODB_TROUBLESHOOTING.md for detailed instructions\n');
      } else if (error.message && error.message.includes('ENOTFOUND')) {
        console.error('\n💡 NETWORK ERROR - Solutions:');
        console.error('   1. Check your internet connection');
        console.error('   2. Verify the cluster URL in MONGODB_URI');
        console.error('   3. Check MongoDB Atlas → Network Access → ensure your IP is whitelisted\n');
      }

      throw error;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('❌ Failed to establish MongoDB connection:', e);
    throw e;
  }

  return cached.conn;
}

export default connectDB;

