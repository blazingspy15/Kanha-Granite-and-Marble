// WhatsApp Utility for KANHA GRANITE AND MARBLE
// Official Business WhatsApp: +91 98200 84842

export const WHATSAPP_NUMBER = '919820084842';
export const WHATSAPP_DISPLAY = '+91 98200 84842';
export const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

/**
 * Builds a direct WhatsApp message URL with encoded text
 * @param {string} message 
 * @returns {string} WhatsApp URL
 */
export const buildWhatsAppUrl = (message) => {
  if (!message) return WHATSAPP_BASE_URL;
  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message.trim())}`;
};

/**
 * Generates an enquiry message for a specific stone product from Catalogue
 */
export const createProductEnquiryMessage = ({ productName, category, application = 'General Application' }) => {
  return `Hello Kanha Granite and Marble,

I am interested in ${productName}.

Application: ${application}
Product Category: ${category}

Please share the product details, availability and quotation.

Thank you.`;
};

/**
 * Generates an enquiry message from the Stone Visualizer 1.0 (Realistic Room Visualizer)
 * Format:
 * Hello Kanha Granite and Marble,
 * I want to enquire about:
 * Material: Black Galaxy Granite
 * Category: Granite
 * Room: Kitchen
 * Application: Countertop
 * Please share availability and quotation details.
 */
export const createVisualizerEnquiryMessage = ({ stoneName, category, room, application }) => {
  return `Hello Kanha Granite and Marble,
I want to enquire about:
Material: ${stoneName}
Category: ${category}
Room: ${room}
Application: ${application}
Please share availability and quotation details.`;
};

/**
 * Generates an enquiry message from Visualizer 2.0 (Macro Slab & Lighting Inspector)
 */
export const createSlabInspectorEnquiryMessage = ({ stoneName, category, lighting, finish }) => {
  return `Hello Kanha Granite and Marble,
I want to enquire about slab availability:
Material: ${stoneName}
Category: ${category}
Finish Preference: ${finish || 'Polished'}
Inspected Under: ${lighting || 'Natural Daylight'}
Please share current lot availability, slab photographs and quotation details.`;
};

/**
 * Generates an enquiry message from Visualizer 3.0 (Dual Stone Comparison)
 */
export const createDualComparisonEnquiryMessage = ({ stoneA, stoneB, preferredStone }) => {
  return `Hello Kanha Granite and Marble,
I compared these materials on your visualizer:
- Option A: ${stoneA.name} (${stoneA.category})
- Option B: ${stoneB.name} (${stoneB.category})
Preferred Option: ${preferredStone || stoneA.name}
Please provide a comparative quotation, thickness options and availability.`;
};

/**
 * Generates an enquiry message from Stone Analysis (Technical Comparison)
 */
export const createStoneAnalysisEnquiryMessage = ({ materialName, category, targetApplication }) => {
  return `Hello Kanha Granite and Marble,
I am reviewing the technical specifications for ${materialName} (${category}).
Target Application: ${targetApplication || 'Flooring / Countertop'}
Please share certified lot test benchmarks, slab availability and expert advice.`;
};

/**
 * Generates an enquiry message from the Contact Form
 */
export const createContactFormEnquiryMessage = ({ name, mobile, category, productName, projectType, area, message }) => {
  return `Hello Kanha Granite and Marble,

New Customer Enquiry:
- Name: ${name}
- Mobile: ${mobile}
- Category: ${category || 'General Consultation'}
- Product: ${productName || 'Not specified'}
- Project Type: ${projectType || 'Residential / Commercial'}
- Approximate Area: ${area ? `${area} sq. ft.` : 'To be measured'}
${message ? `- Message: ${message}` : ''}

Please get in touch with product details and availability.

Thank you.`;
};
