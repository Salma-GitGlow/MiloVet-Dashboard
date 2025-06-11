import React from "react";
import "./view.css";
import ownerAvatar from "../../../assets/imgs/ownerImg.svg";
import animalAvatar from "../../../assets/imgs/horse.svg";
import vetAvatar from "../../../assets/imgs/vetImg.svg";

const GenericViewCard = ({ data, type }) => {
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

      default:
        return null;
    }
  };

  return <div className="view-card-container">{renderContent()}</div>;
};

export default GenericViewCard;
