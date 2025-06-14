import React, { useEffect, useState } from "react";
import "./view.css";
import "../table.css";
import "../../Content/content.css";
import axois from "../../../utils/axoisConfig.js";
import animalAvatar from "../../../assets/imgs/horse.svg";
import vetAvatar from "../../../assets/imgs/vetImg.svg";
import articleAvatar from "../../../assets/imgs/artcleImg.svg";

const GenericViewCard = ({ data, type }) => {
  const [ownersData, setOwnersData] = useState({});

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const response = await axois.get(
          "https://milovetapi.onrender.com/api/owners"
        );
        const owners = response.data.data?.owners || response.data.data || [];

        const ownersMap = {};
        owners.forEach((owner) => {
          ownersMap[owner._id] = {
            name: `${owner.firstName} ${owner.lastName}`,
            email: owner.email,
            phone: owner.phone,
          };
        });

        setOwnersData(ownersMap);
      } catch (err) {
        console.error("Failed to fetch owners:", err);
      }
    };

    fetchOwners();
  }, []);

  const renderContent = () => {
    switch (type) {
      case "owner":
        return (
          <>
            <div className="card-image">
              <img
                src={data.avatar || data.photo || ownerAvatar}
                alt={data.firstName}
                onError={(e) => {
                  e.target.src = ownerAvatar;
                }}
              />
            </div>
            <div className="card-details">
              <p>
                <strong>ID:</strong> {data._id}
              </p>
              <p>
                <strong>Name:</strong> {data.firstName} {data.lastName}
              </p>
              <p>
                <strong>Email:</strong> {data.email}
              </p>
              <p>
                <strong>Phone:</strong> {data.phone || "N/A"}
              </p>
              <p>
                <strong>Address:</strong> {data.address || "N/A"}
              </p>
              <div className="animals-section">
                <h4>Animals:</h4>
                {data.animals?.length > 0 ? (
                  <ul>
                    {data.animals.map((animal) => (
                      <li key={animal._id}>
                        {animal.animalName} ({animal.species})
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No animals</p>
                )}
              </div>
            </div>
          </>
        );

      case "animal":
        return (
          <>
            <div className="card-image">
              <img
                src={data.avatar || data.photo || animalAvatar}
                alt={data.animalName}
                onError={(e) => {
                  e.target.src = animalAvatar;
                }}
              />
            </div>
            <div className="card-details">
              <p>
                <strong>ID:</strong> {data._id}
              </p>
              <p>
                <strong>Name:</strong> {data.animalName}
              </p>
              <p>
                <strong>Species:</strong> {data.species}
              </p>
              <p>
                <strong>Breed:</strong> {data.breed}
              </p>
              <p>
                <strong>Age:</strong> {data.age}
              </p>
              <p>
                <strong>Gender:</strong> {data.gender}
              </p>
              <p>
                <strong>Status:</strong> {data.status}
              </p>
              <p>
                <strong>Medical History:</strong> {data.medicalHistory || "N/A"}
              </p>
              <p>
                <strong>Owner:</strong>{" "}
                {data.ownerId
                  ? `${data.ownerId.firstName} ${data.ownerId.lastName}`
                  : "No Owner"}
              </p>
            </div>
          </>
        );

      case "vets":
        console.log("Raw data received:", data);
        const vetData = data.vet || data;
        console.log("Processed vetData:", vetData);
        if (!vetData) {
          console.error("Vet data is undefined!");
          return <div>Error: No vet data found</div>;
        }
        return (
          <>
            <div className="card-image">
              <img
                src={vetData.avatar || vetData.photo || vetAvatar}
                alt={vetData.firstName}
                onError={(e) => {
                  e.target.src = vetAvatar;
                }}
              />
            </div>
            <div className="card-details">
              <p>
                <strong>ID:</strong> {vetData._id}
              </p>
              <p>
                <strong>Name:</strong> {vetData.firstName} {vetData.lastName}
              </p>
              <p>
                <strong>Email:</strong> {vetData.email}
              </p>
              <p>
                <strong>Gender:</strong> {vetData.gender}
              </p>
              <p>
                <strong>Speciality:</strong> {vetData.speciality}
              </p>
            </div>
          </>
        );

      case "articles":
        console.log("Raw data received:", data);
        const articleData = data.article || data;
        console.log("Processed vetData:", articleData);
        if (!articleData) {
          console.error("Vet data is undefined!");
          return <div>Error: No article data found</div>;
        }
        return (
          <>
            <div className="article-view-container">
              <div className="article-image-container">
                <img
                  src={articleData.avatar || articleData.photo || articleAvatar}
                  alt={articleData.title}
                  className="article-image"
                  onError={(e) => {
                    e.target.src = articleAvatar;
                  }}
                />
              </div>

              <div className="card-details">
                <div className="article-content-box">
                  <h3>Article Content:</h3>
                  <div className="content-text">{articleData.content}</div>
                </div>
                <p>
                  <strong>ID:</strong> {articleData._id}
                </p>
                <p>
                  <strong>Title:</strong> {articleData.title}
                </p>
                <p>
                  <strong>Category:</strong> {articleData.category}
                </p>
                <p>
                  <strong>Created Time:</strong> {articleData.createdTime}
                </p>
              </div>
            </div>
          </>
        );

      case "diseases":
        console.log("Raw data received:", data);
        const diseaseData = data.disease || data;
        console.log("Processed vetData:", diseaseData);
        if (!diseaseData) {
          console.error("Vet data is undefined!");
          return <div>Error: No disease data found</div>;
        }
        return (
          <>
            <div className="article-view-container">
              <div className="article-image-container">
                <img
                  src={diseaseData.avatar || diseaseData.photo || articleAvatar}
                  alt={diseaseData.title}
                  className="article-image"
                  onError={(e) => {
                    e.target.src = articleAvatar;
                  }}
                />
              </div>

              <div className="card-details">
                <div className="article-content-box">
                  <h3>Disease Content:</h3>
                  <div className="content-text">{diseaseData.content}</div>
                </div>
                <p>
                  <strong>ID:</strong> {diseaseData._id}
                </p>
                <p>
                  <strong>Title:</strong> {diseaseData.title}
                </p>
                <p>
                  <strong>Created Time:</strong> {diseaseData.createdTime}
                </p>
              </div>
            </div>
          </>
        );

      case "products":
        console.log("Raw data received:", data);
        const productData = data.product || data;
        console.log("Processed vetData:", productData);
        if (!productData) {
          console.error("Vet data is undefined!");
          return <div>Error: No product data found</div>;
        }
        return (
          <>
            <div className="article-view-container">
              <div className="article-image-container">
                <img
                  src={
                    productData.avatar ||
                    productData.photo ||
                    productData.images ||
                    articleAvatar
                  }
                  alt={productData.title}
                  className="article-image"
                  onError={(e) => {
                    e.target.src = articleAvatar;
                  }}
                />
              </div>

              <div className="card-details">
                <p>
                  <strong>ID:</strong> {productData._id}
                </p>
                <p>
                  <strong>Title:</strong> {productData.title}
                </p>
                <p>
                  <strong>Description:</strong> {productData.description}
                </p>
                <p>
                  <strong>Category:</strong> {productData.category}
                </p>
                <p>
                  <strong>Price:</strong> $
                  {productData.price?.toFixed(2) || "0.00"}
                </p>
                <p>
                  <strong>Quantity:</strong> {productData.quantity}
                </p>
                <p>
                  <strong>Rating:</strong> {productData.rating} ⭐
                </p>
                <p>
                  <strong>Sold:</strong> {productData.sold}
                </p>
              </div>
            </div>
          </>
        );
      case "orders":
        console.log("Raw data received:", data);
        const ordersData = data.order || data;
        console.log("Processed ordersData:", ordersData);
        if (!ordersData) {
          console.error("orders data is undefined!");
          return <div>Error: No order data found</div>;
        }

        const ownerInfo = ownersData[ordersData.ownerId] || {
          name: "Unknown Owner",
          email: "N/A",
          phone: "N/A",
        };

        return (
          <>
            <div className="article-view-container">
              <div className="card-details">
                <p>
                  <strong>ID:</strong> {ordersData._id}
                </p>
                <p>
                  <strong>Owner Name:</strong> {ownerInfo.name}
                </p>

                <p>
                  <strong>Items Count:</strong> {ordersData.items.length}
                </p>
                <p>
                  <strong>Total Amount:</strong>$
                  {ordersData.totalAmount?.toFixed(2) || "0.00"}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className={`status-badge ${ordersData.status}`}>
                    {ordersData.status}
                  </span>
                </p>
                <p>
                  <strong>Address:</strong> {ordersData.address}{" "}
                </p>
                <p>
                  <strong>Created Time:</strong> {ordersData.createdAt}
                </p>
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return <div className="view-card-container">{renderContent()}</div>;
};

export default GenericViewCard;
