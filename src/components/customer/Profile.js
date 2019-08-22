import React from "react";
import { Grid, Image } from "semantic-ui-react";
import UpdateUserForm from "./UpdateUserForm";
import ErrorMessage from "../ErrorMessage";
import "./profile.css";
export default function Profile(props) {
  return (
    <>
      {props.errMess ? (
        <ErrorMessage header={props.errMess} message="Retry the update" />
      ) : (
        <></>
      )}
      <Grid columns={2} stackable style={{ marginBottom: "3.2em" }}>
        <Grid.Row
          className="profname"
          style={{ marginLeft: props.mobile ? "1em" : "0em" }}
        >
          <Grid.Column width="4" textAlign="right">
            <Image alt="user" circular src={props.user.image} />
          </Grid.Column>
          <Grid.Column
            className="profname"
            style={{
              marginLeft: props.mobile ? "-100em!important" : "-20px",
              marginTop: props.mobile ? "0em" : "0.4em"
            }}
          >
            <span
              style={{
                marginTop: props.mobile ? "10em" : "0.4em",
                height: "17px",
                width: "73px",
                color: "#000000",
                fontWeight: "normal",
                fontFamily: "Ropa Sans",
                fontSize: "16px",
                lineheight: "17px"
              }}
            >
              {props.user.fullname} <br />{" "}
            </span>
            <span
              style={{
                height: "17px",
                width: "73px",
                color: "#909090;",
                fontWeight: "normal",
                fontFamily: "Ropa Sans",
                fontSize: "16px",
                lineheight: "17px"
              }}
            >
              {props.user.phone}{" "}
            </span>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <UpdateUserForm
        updateUserService={props.updateUserService}
        user={props.user}
      />
    </>
  );
}
