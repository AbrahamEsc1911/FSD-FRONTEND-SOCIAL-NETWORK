import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { followUser, getUserById } from "../../Services/user.services";
import { CInputs } from "../../components/CInputs/CInputs";
import { AnyUserContex } from "../../Context/AnyUserProfileContext/anyUserProfileContext";
import { CBlockContent } from "../../components/CBlockContent/CBlockContent";
import { CSectionOneProfile } from "../../components/CSectionOneProfile/CSectionOneProfile";
import { CSectionTwoProfile } from "../../components/CSectionTwoProfile/CSectionTwoProfile";
import './AnyUserProfile.css'

export const AnyUserProfile = () => {
  const passport = JSON.parse(localStorage.getItem("passport"));
  let token = null;
  let userId = null;
  if (passport) {
    (token = passport.token), (userId = passport.tokenData.id);
  }

  const { id } = useParams();
  const navigate = useNavigate();
  const { setNavigationPath } = useContext(AnyUserContex);
  const [userData, setUserData] = useState({
    _id: "",
    name: "",
    email: "",
    createdAt: "",
    posts: [],
    followers: [],
    following: [],
    phone: "phone",
    city: "city",
    born: "born",
    profile: "",
  });

  useEffect(() => {
    const bringUser = async () => {
      const res = await getUserById(id);
      if (res.success) {
        setUserData(res.data);
        console.log(res.data);
      }
      //TODO AGREGAR REDIRECCION A 404 SI EL RESPONSE ES FALSE
    };
    bringUser();
  }, []);

  const followUnfollow = async (e) => {
    const id = e.target.name;
    if (passport) {
      await followUser(token, id);
      const res = await getUserById(id);
      setUserData(res.data);
    } else {
      setNavigationPath(id);
      navigate("/login");
    }
  };

  return (
    <>
      <div>
        <CBlockContent
          content={
            <div>
              <div>
                <CSectionOneProfile
                  portada={"../images/portada.jpg"}
                  profile={userData.profile}
                  name={userData.name}
                  email={userData.email}
                  posts={userData.posts.length}
                  followers={userData.followers.length}
                  following={userData.following.length}
                />
                <div>
                  <CSectionTwoProfile
                    bornDate={userData.born}
                    phone={userData.phone}
                    city={userData.city}
                    value={userData.followers.includes(userId) ? "Unfollow": "Follow"}
                    buttonName={userData._id}
                    onClick={followUnfollow}
                    className={userData.followers.includes(userId) ? "unfollow-button" : "follow-button"}
                  />
                </div>
              </div>
            </div>
          }
        />
      </div>

    </>
  );
};
