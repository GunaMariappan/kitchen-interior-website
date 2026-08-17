// Central WhatsApp configuration
// Change this number when the business number changes
export const WHATSAPP_NUMBER = "919999999999"; // country code + number, no + or spaces

export const getWhatsAppLink = (message) => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
};