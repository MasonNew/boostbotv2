import React, {
  useMemo,
  useState
} from "react";
import axios from "axios";

const apiUrl = process.env.REACT_APP_BACKEND_URL;

// create context
export const ContactContext = React.createContext();

export const ContactProvider = ({
  children
}) => {
  const [contacts, setContacts] = useState(null);

  const value = useMemo(() => {
    const getContacts = () => {
      console.log("get Contacts")
      return axios
        .get(
          `${apiUrl}/v1/contacts`, {}, {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log("get Contacts", response.data)
          setContacts(response.data.contacts);
        });
    };

    const createContacts = (id, type, link) => {
      console.log("create Contacts", id, type, link)
      return axios
        .post(
          `${apiUrl}/v1/contacts`, {
            id,
            type,
            link
          }, {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log("create Contacts", response.data)
          getContacts();
          alert("Wallet created!")
          setContacts(response.data.contacts);
        });
    };

    const updateContactById = (contactId, link) => {
      const postData = {
        contactLink: link,
      };
      return axios
        .put(`${apiUrl}/v1/contacts/${contactId}`, postData)
        .then((response) => {
          console.log("contact Updated::", response);
          getContacts();
          alert("contact updated!");
        })
        .catch((err) => {
          console.log(err);
        });
    };

    return {
      contacts,
      getContacts,
      createContacts,
      updateContactById,
    };
  }, [contacts]);

  return ( <
    ContactContext.Provider value = {
      value
    } > {
      children
    } </ContactContext.Provider>
  );
};