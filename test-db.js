require('dotenv').config();
const uri = process.env.MONGODB_URI || '';

console.log('--- MONGODB URI CHECK ---');
console.log('1. Starts with mongodb+srv://:', uri.startsWith('mongodb+srv://'));
console.log('2. Has angle brackets (< or >):', /[<>]/.test(uri));
console.log('3. Has whitespace:', /\s/.test(uri));
console.log('4. Valid format (user:pass@host):', /^mongodb\+srv:\/\/[^:@/]+:[^@/]+@[^/]+/.test(uri));

try {
  const x = new URL(uri);
  console.log('5. URI parsed successfully:', true);
  console.log('   Host:', x.hostname);
  const pass = decodeURIComponent(x.password);
  console.log('6. Special characters unencoded in password:', /[\/?#\[\]@]/.test(pass) && /[\/?#\[\]@]/.test(x.password));
} catch (e) {
  console.log('5. URI parsed successfully:', false);
  console.log('   Error:', e.message);
}