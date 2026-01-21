const fs = require('fs');
require('dotenv').config();

let output = "Environment Variable Check:\n";
output += "JITSI_APP_ID: " + (process.env.JITSI_APP_ID ? "Found (" + process.env.JITSI_APP_ID.substring(0, 5) + "...)" : "Missing") + "\n";
output += "JITSI_KID: " + (process.env.JITSI_KID ? "Found (" + process.env.JITSI_KID.substring(0, 5) + "...)" : "Missing") + "\n";
output += "JITSI_PRIVATE_KEY: " + (process.env.JITSI_PRIVATE_KEY ? "Found (Length: " + process.env.JITSI_PRIVATE_KEY.length + ")" : "Missing") + "\n";

if (process.env.JITSI_PRIVATE_KEY) {
    const key = process.env.JITSI_PRIVATE_KEY;
    output += "Key Newlines: " + (key.includes('\\n') ? "Escaped \\n detected" : "No escaped \\n") + "\n";
    output += "Key Real Newlines: " + (key.includes('\n') ? "Real newlines detected" : "No real newlines") + "\n";
}

fs.writeFileSync('env_check_output.txt', output);
console.log("Check complete. Output written to env_check_output.txt");
