/**
 * Sentinel (QA Verifier) Test Script
 * This script simulates the data integrity checks performed by the Sentinel agent.
 */

interface Lead {
  businessName: string;
  email?: string;
  phone?: string;
  webhookUrl?: string;
}

function validateLead(lead: Lead): { success: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!lead.businessName) {
    errors.push("CRITICAL: Missing business name.");
  }
  
  if (!lead.email && !lead.phone) {
    errors.push("CRITICAL: Missing contact information (email or phone).");
  }
  
  if (!lead.webhookUrl) {
    errors.push("WARNING: No webhook URL provided for automation.");
  }

  return {
    success: errors.filter(e => e.startsWith("CRITICAL")).length === 0,
    errors
  };
}

// Test Cases
const testLeads: Lead[] = [
  { businessName: "Valid Business", email: "test@example.com", webhookUrl: "https://hook.com" },
  { businessName: "", email: "test@example.com" },
  { businessName: "No Contact Info", webhookUrl: "https://hook.com" }
];

console.log("--- Sentinel QA Verification Report ---");
testLeads.forEach((lead, index) => {
  const result = validateLead(lead);
  console.log(`\nLead #${index + 1}: ${lead.businessName || "[EMPTY NAME]"}`);
  if (result.success) {
    console.log("Status: 🟢 PASS");
  } else {
    console.log("Status: 🔴 FAIL");
  }
  result.errors.forEach(err => console.log(` - ${err}`));
});
console.log("\n--- End of Report ---");
