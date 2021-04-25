import { FoldingCube } from "better-react-spinkit";
const Loding = () => {
  return (
    <center style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <div>
        <img
          src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png"
          alt="Logo"
          height="150"
          style={{ marginBottom: 10 }}
        />
        <FoldingCube color="#3cbc28" size={90} />
      </div>
    </center>
  );
};

export default Loding;
