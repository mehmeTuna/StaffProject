import React from "react";

const Profile = () => {
  return (
    <React.Fragment>
      <div>Plan detaylari</div>
      <div className="d-flex flex-column flex-md-row flex-lg-row justify-content-between">
        <div className="d-flex flex-column flex-center">
          <div className="view overlay">
            <img
              src="https://picsum.photos/200/200"
              className="img-fluid"
              alt="Business"
            />
            <div className="mask flex-center">
              <p>resmi degsitir</p>
            </div>
          </div>
          <div className="text-muted h5 mt-2">Mehmet Tuna</div>

          <div className="d-flex flex-sm-row">
            <div className="d-block text-center">
              <div className="h-5">Total User</div>
              <div className="btn p-1 h5">10</div>
            </div>
            <div className="ml-2 text-center">
              <div className="h-5">Total Experience</div>
              <div className="btn p-1 h5">100</div>
            </div>
          </div>
        </div>

        <div className="row justify-content-between">
          <div className="text-muted h5">Username</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Profile;
