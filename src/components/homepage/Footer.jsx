const Footer = () => {
  return (
    <footer
      style={{
        display: "flex",
        placeContent: "center",
        color: "grey",
      }}
    >
      <p style={{ fontWeight: "bold", fontSize: 10 }}>
        版权&copy;{new Date().getFullYear()} 呼和浩特市敬业学校
      </p>
    </footer>
  );
};
export default Footer;
