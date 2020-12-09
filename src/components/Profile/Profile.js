import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleAvatar } from "../../redux/actions/App";
import { getToggleAvatar } from "../../redux/selectors/App";
import styles from "./Profile.module.css";

const Profile = () => {
  const dispatch = useDispatch();
  const avatar = useSelector(getToggleAvatar);

  const handleAvatar = () => {
    !avatar ? dispatch(toggleAvatar(true)) : dispatch(toggleAvatar(false));
  };

  return (
    <div className={styles.Profile}>
      {avatar ? (
        <div className={styles.ProfileImage}>
          <img src="https://picsum.photos/285/285" alt="img"></img>
        </div>
      ) : (
        <div className={styles.ProfileImage}>
          <img src="https://api.hello-avatar.com/adorables/285/%3cYOUR_EMAIL" alt="img"></img>
        </div>
      )}
      <div className={styles.ProfileName}>John Doe</div>
      <div className={styles.ProfileData}>john.doe@gmail.com</div>
      <div className={styles.ProfileData}>johndoe.com</div>
      <div className={styles.Button} onClick={handleAvatar}>
        Toggle avatar
      </div>
    </div>
  );
};

export default Profile;
