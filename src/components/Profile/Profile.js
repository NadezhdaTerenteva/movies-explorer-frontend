import "./Profile.css";

function Profile() {
  return (
    <section className="profile">
      <h3 className="profile__header">Привет, Виталий!</h3>
      <form className="profile__form">
        <div className="profile__input-field">
        <label for="name" className="profile__form-label">
          Имя</label>
          <input
          className="profile__input"
          type="text"
          id="name"
          name="name"
          required
        ></input>
        </div>
        <div className="profile__input-field">
        <label for="email" className="profile__form-label">
        E-mail
        </label>
        <input
          className="profile__input"
          type="email"
          id="email"
          name="email"
          required
        ></input>
         </div>
        <button className="profile__submit-button" type="submit">
        Редактировать
        </button>
      </form>
      <h4 className="profile__caption">
        <a className="profile__caption profile__caption-link"> Выйти из аккаунта</a>
      </h4>
    </section>
  );
}

export default Profile;
