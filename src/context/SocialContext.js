import React, {
  useMemo,
  useState
} from "react";
import axios from "axios";

const apiUrl = process.env.REACT_APP_BACKEND_URL;

// create context
export const SocialContext = React.createContext();

export const SocialProvider = ({
  children
}) => {
  const [socials, setSocials] = useState(null);

  const value = useMemo(() => {
    const getSocials = () => {
      console.log("get Socials")
      return axios
        .get(
          `${apiUrl}/v1/socials`, {}, {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log("get Socials", response.data)
          setSocials(response.data.socials);
        });
    };

    const createSocials = (name, socialID) => {
      console.log("create Socials", name, socialID)
      return axios
        .post(
          `${apiUrl}/v1/socials`, {
            name,
            socialID
          }, {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log("create Socials", response.data)
          getSocials();
          alert("Social created!")
          setSocials(response.data.socials);
        });
    };

    const updateSocialById = (id, socialID) => {
      const postData = {
        socialID: socialID,
      };
      return axios
        .put(`${apiUrl}/v1/socials/${id}`, postData)
        .then((response) => {
          console.log("social Updated::", response);
          getSocials();
          alert("Social updated!");
        })
        .catch((err) => {
          console.log(err);
        });
    };

    return {
      socials,
      getSocials,
      createSocials,
      updateSocialById,
    };
  }, [socials]);

  return ( <
    SocialContext.Provider value = {
      value
    } > {
      children
    } </SocialContext.Provider>
  );
};