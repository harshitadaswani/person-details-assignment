import axios from "axios";
import React, { useEffect, useState } from "react";
import "../index.css";

export const Card = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);

  const getData = async () => {
    try {
      const uri = "https://jsonplaceholder.typicode.com/users";
      const response = await axios.get(uri);
      if (response.status !== 200)
        throw new Error(`${response.status} ${response.statusText}`);
      setLoader(false);
      const personData = response.data.map((detail) => ({
        ...detail,
        isDetail: false,
      }));
      setData(personData);
      console.log(response);
    } catch (e) {
      console.error(e);
      setLoader(false);
    }
  };

  const clickHandler = (id) => {
    const moreDetails = data.map((detail) =>
      id === detail.id ? { ...detail, isDetail: !detail.isDetail } : detail
    );
    setData(moreDetails);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {loader && <div className="txt-m p-xs m-xs txt-center">Loading</div>}
      {!loader &&
        data.map((detail) => {
          const {
            id,
            name,
            username,
            address,
            company,
            email,
            website,
            phone,
            isDetail,
          } = detail;
          return (
            <div className="p-s m-s br-m primary-bg secondary-color">
              <div
                key={id}
                className="flex flex-space-between flex-align-center"
              >
                <div className="p-xs">
                  <div className="fw-bold">UserName:</div>
                  <div>{username}</div>
                </div>
                <div className="p-xs">
                  <div className="fw-bold">Name:</div>
                  <div>{name}</div>
                </div>
                <div className="p-xs">
                  <div className="fw-bold">City:</div>
                  <div>{address.city}</div>
                </div>
                <button
                  className="br-s border-none btn accent-bg primary-color p-xs"
                  onClick={() => clickHandler(id)}
                >
                  View Details
                </button>
              </div>

              <div>
                {isDetail && (
                  <div className="border br-s flex flex-space-between p-xs m-xs">
                    <div className="p-xs">
                      <div className="fw-black"> Personal Information: </div>
                      <div className="fw-bold">
                        Email: <span className="fw-regular">{email} </span>
                      </div>
                      <div className="fw-bold">
                        Phone: <span className="fw-regular">{phone}</span>
                      </div>
                      <div className="fw-bold">
                        Website: <span className="fw-regular">{website}</span>
                      </div>
                    </div>
                    <div className="p-xs">
                      <div className="fw-black">Address: </div>
                      <div className="fw-bold">
                        Suite:{" "}
                        <span className="fw-regular">{address.suite}</span>
                      </div>
                      <div className="fw-bold">
                        Street:{" "}
                        <span className="fw-regular">{address.street}</span>
                      </div>
                      <div className="fw-bold">
                        City: <span className="fw-regular">{address.city}</span>
                      </div>
                      <div className="fw-bold">
                        Zip Code:{" "}
                        <span className="fw-regular">{address.zipcode}</span>
                      </div>
                    </div>
                    <div className="p-xs">
                      <div className="fw-black">Company Information:</div>
                      <div className="fw-bold">
                        Name: <span className="fw-regular">{company.name}</span>
                      </div>
                      <div className="fw-bold">
                        Business:{" "}
                        <span className="fw-regular">{company.bs}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
    </>
  );
};
