// src/app/api/chatbot/route.js

export async function POST(req) {
    try {
      const { message } = await req.json();
      let botReply;
  
      switch (true) {
        case /help|hello|hi/.test(message.toLowerCase()):
            botReply = "Welcome to our chatbot! How can I assist you today?";
            break;
        case /email|phone|whatsapp|call/.test(message.toLowerCase()):
            botReply= "Feel free to contact we Through abcd@gmail.com or +91987654310"
            break;
        case /order status|track my order|order update/.test(message.toLowerCase()):
          botReply = "You can track your order status by providing your order number. Please visit the 'Order Status' page or contact support if you need further assistance.";
          break;
        case /shipping information|shipping status/.test(message.toLowerCase()):
          botReply = "For shipping information, please provide your order number. You can also check our 'Shipping Information' page for details.";
          break;
        case /return|exchange|return policy|refund/.test(message.toLowerCase()):
          botReply = "To initiate a return or exchange, please visit our 'Returns and Exchanges' page. You can also contact our support team for further assistance.";
          break;
        case /payment methods|payment options/.test(message.toLowerCase()):
          botReply = "We accept various payment methods including Credit/Debit Cards, PayPal, and Apple Pay. For more details, please visit our 'Payment Methods' page.";
          break;
        case /account login|forgot password|reset password/.test(message.toLowerCase()):
          botReply = "If you are having trouble logging in or forgot your password, please visit the 'Forgot Password' page to reset your password.";
          break;
        case /website issue|report a problem/.test(message.toLowerCase()):
          botReply = "If you are experiencing issues with our website, please report the problem using the 'Report an Issue' page, and our team will investigate it.";
          break;
        case /product details|product information/.test(message.toLowerCase()):
          botReply = "For detailed information about a product, please visit the product page or contact our support team for assistance.";
          break;
        case /product recommendations|suggestions/.test(message.toLowerCase()):
          botReply = "Based on your preferences, we can recommend some products. Please provide more details about what you are looking for.";
          break;
        case /contact support|speak to a representative |speak |call/.test(message.toLowerCase()):
          botReply = "If you need further assistance, please contact our support team via the 'Contact Us' page, and one of our representatives will get in touch with you.";
          break;
       
        default:
          botReply = "I'm sorry, I don't have an answer for that. Our executive will connect with you shortly to assist with your query.";
      }
  
      return new Response(JSON.stringify({ reply: botReply }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      return new Response(JSON.stringify({ message: "Internal Server Error" }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  }
  