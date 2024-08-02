/** @jsxImportSource frog/jsx */

import { Button, Frog } from "frog";
import { devtools } from "frog/dev";
import { handle } from "frog/next";
import { serveStatic } from "frog/serve-static";
import {
  incrementOption1,
  incrementOption2,
  getState,
  saveFormData,
  getFormData,
} from "../../utils/state";

const app = new Frog({
  assetsPath: "/",
  basePath: "/api",
  title: "Your Kramer Frame",
});

app.use("/*", serveStatic({ root: "./public" }));

app.frame("/", (c) => {
  const formData = getFormData(); // Function to get saved form data

  return c.res({
    action: "/submit",
    image: (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          backgroundImage: `url(https://www.kramerapp.com/kramer_pic.png)`,
          backgroundSize: "100% 200%",
          backgroundPosition: "0 -50%",
          filter: "brightness(50%)",
          flexDirection: "column",
          flexWrap: "nowrap",
          height: "100%",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            color: "white",
            fontSize: 60,
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            lineHeight: 1.4,
            padding: "0 120px",
            whiteSpace: "pre-wrap",
            textAlign: "center",
            filter: "brightness(100%)",
          }}
        >
          {formData.title}
        </div>
      </div>
    ),
    intents: [
      <Button value="option1">{formData.options[0]}</Button>,
      <Button value="option2">{formData.options[1]}</Button>,
    ],
  });
});

app.frame("/submit", async (c) => {
  const { title, options, selectedImage } = await c.req.json(); // Read form data from request

  saveFormData({
    title,
    options,
    image: selectedImage,
  });

  const { buttonValue } = c;

  if (buttonValue === "option1") incrementOption1();
  if (buttonValue === "option2") incrementOption2();

  return c.res({
    image: (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          backgroundImage: `url(https://www.kramerapp.com/kramer_pic.png)`,
          backgroundSize: "100% 200%",
          backgroundPosition: "0 -50%",
          filter: "brightness(75%)",
          flexDirection: "column",
          flexWrap: "nowrap",
          height: "100%",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            color: "white",
            fontSize: 60,
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            lineHeight: 1.4,
            padding: "0 120px",
            whiteSpace: "pre-wrap",
            textAlign: "center",
            filter: "brightness(100%)",
          }}
        >
          You selected: {buttonValue}
        </div>
      </div>
    ),
    intents: [
      <Button.Link href="https://www.newalina.com/">Follow</Button.Link>,
      <Button action="/view">View</Button>,
    ],
  });
});

app.frame("/view", (c) => {
  const state = getState();

  return c.res({
    image: (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          backgroundImage: `url(https://www.kramerapp.com/kramer_pic.png)`,
          backgroundSize: "100% 200%",
          backgroundPosition: "0 -50%",
          filter: "brightness(75%)",
          flexDirection: "column",
          flexWrap: "nowrap",
          height: "100%",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            color: "white",
            fontSize: 40,
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            lineHeight: 1.4,
            padding: "0 120px",
            whiteSpace: "pre-wrap",
            textAlign: "center",
            filter: "brightness(100%)",
          }}
        >
          <span style={{ margin: "0 250px 0 10px" }}>
            option1: {state.option1Count.toString()}
          </span>
          <span>option2: {state.option2Count.toString()}</span>
        </div>
      </div>
    ),
    intents: [
      <Button.Link href="https://www.newalina.com/">Follow</Button.Link>,
    ],
  });
});

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
