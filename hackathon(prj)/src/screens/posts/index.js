import { auth, db, GetProduct } from "../../config/firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaClipboardList,
  FaCogs,
  FaSignOutAlt,
  FaEnvelope,
  FaSignInAlt,
} from "react-icons/fa";
import "./posts.css";

export default function Dashboard() {
  const [userDetails, setUserDetails] = useState(null);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);
      setUserDetails(user);
    });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = await GetProduct();
      setProducts(productsData);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchUserData();
  }, []);

  console.log("products ----->", products);

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        {userDetails ? (
          <div className="profile-section">
            <img
              src={userDetails.photoURL}
              alt="User Profile"
              className="profile-pic"
            />
            <h6 className="email">{userDetails.email}</h6>
          </div>
        ) : (
          <p>Loading...</p>
        )}
        <ul className="nav-links">
          <li onClick={() => navigate("/home")}>
            <FaHome className="nav-icon" /> Home
          </li>
          <li onClick={() => navigate("/addpost")}>
            <FaClipboardList className="nav-icon" /> Add Post
          </li>
          <li onClick={() => navigate("/message")}>
            <FaEnvelope className="nav-icon" /> Messages
          </li>
          <li onClick={() => navigate("/settings")}>
            <FaCogs className="nav-icon" /> Settings
          </li>
          {userDetails ? (
            <li onClick={() => auth.signOut()}>
              <FaSignOutAlt className="nav-icon" /> Logout
            </li>
          ) : (
            <li onClick={handleLogin}>
              <FaSignInAlt className="nav-icon" /> Login
            </li>
          )}
        </ul>
      </div>

      <div className="main-content">
        <div className="posts-container">
          {products.map((item) => (
            <div className="post-box" key={item.id}>
              <img className="post-img" src={item.image} alt={item.title} />
              <p className="post-title">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


