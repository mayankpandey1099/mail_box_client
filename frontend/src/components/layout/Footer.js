

const Footer = () => {
    const linkStyle = {
      fontWeight: "bold",
      fontFamily: "Montserrat, sans-serif", 
    };
  return (
    <div
      className="text-white text-center w-full bg-slate-700"
      style={{
        fontWeight: "bold",
        fontFamily: "Montserrat, sans-serif",
      }}
    >
      
        <p className="text-xl font-bold" style={linkStyle}>
          &copy; 2024 The Inbox-Stream
        </p>
        <p className="mt-2 mb-2" style={linkStyle}>
          Contact us: contact@theInboxStream.com
        </p>
        <p>Follow us on social media:</p>
        <div className="flex justify-center mt-2" style={linkStyle}>
          <a href="#" className="mr-4" style={linkStyle}>
            Facebook
          </a>
          <a href="#" className="mr-4" style={linkStyle}>
            Twitter
          </a>
          <a href="#" className="mr-4" style={linkStyle}>
            Instagram
          </a>
        </div>
    </div>
  );
};

export default Footer;