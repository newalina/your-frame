// types/extended-context.ts

import { FrameContext as BaseFrameContext, Context, Env } from "frog";
import { Input } from "hono";
import type { FrameResponseFn } from "../node_modules/frog/types/frame";
import type { BaseErrorResponseFn } from "../node_modules/frog/types/response.js";
import { FrameData as BaseFrameData } from "../node_modules/frog/types/frame";

// Extend the FrameContext type to include `query`
export type ExtendedFrameContext<
  env extends Env = Env,
  path extends string = string,
  input extends Input = {},
  //
  _state = env["State"]
> = Context<env, path, input, _state> & {
  /**
   * @deprecated As of `v0.5.0`, this property is redundant (there is now only one render cycle) and will be removed in a future version.
   *
   * Current render cycle of the frame.
   *
   * - `main` - Render cycle for the main frame route.
   * - `image` - Render cycle for the OG image route.
   */
  cycle: "main" | "image";
  /**
   * Function to derive the frame's state based off the state from the
   * previous frame.
   */
  deriveState: <
    deriveFn extends (previousState: _state) => void | Promise<void>
  >(
    fn?: deriveFn
  ) => ReturnType<deriveFn> extends Promise<void> ? Promise<_state> : _state;
  /** Error response that includes message and statusCode. */
  error: BaseErrorResponseFn;
  /** Frame response that includes frame properties such as: image, intents, action, etc */
  res: FrameResponseFn;
  /**
   * Transaction ID of the executed transaction (if any). Maps to:
   * - Ethereum: a transaction hash
   */
  // transactionId?: FrameData["transactionId"] | undefined;
  cookie?: string;
};

// export type CustomFrameData = BaseFrameData & {
//   title?: string;
//   options?: string;
//   imageUrl?: string;
// };
