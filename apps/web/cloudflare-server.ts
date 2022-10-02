import BaseServer from "next/dist/server/web-server";
import HomePage from "private-next-pages/index";

// NOTE: Experimental and work in progress
export class CloudflareWebServer extends BaseServer {
  constructor(options: any) {
    super(options);
  }
}

export { HomePage };

export default CloudflareWebServer;

