import type { GetServerSideProps } from "next";
import React from "react";
export interface PageProps {
  isServer?: boolean;
  isCold?: boolean;
  city?: string;
  ip?: string;
  runtime?: string;
  generatedAt: number;
  payload?: string;
  edgeAgent?: string;
}

export default function PageSsr({
  generatedAt,
  city = "",
  ip = "",
  isCold = false,
  edgeAgent,
}: PageProps) {
  return (
    <React.Fragment>
      <div style={{ height: "100vh", width: "100vw" }}>
        <Card />

        <main>
          <h1>
            <span>Hello from the edge!</span>
          </h1>

          <div className="info">
            <div className="block">
              <div className="contents">
                <span>Your city</span>
                <strong
                  title={
                    city === null
                      ? "GeoIP information could not be derived from your IP"
                      : undefined
                  }
                  className={city === null ? "na" : ""}
                >
                  {city === null ? "N/A" : city}
                </strong>
              </div>
            </div>

            <div className="block">
              <div className="contents">
                <span>Your IP address</span>
                <strong>{ip}</strong>
              </div>
            </div>
          </div>
        </main>
        <div className="debug">
          Generated at {new Date(generatedAt).toISOString()} (
          {isCold ? "cold" : "hot"}) (User Agent: {edgeAgent})
        </div>
      </div>

      <Footer />
    </React.Fragment>
  );
}

function Card() {
  return (
    <svg className="card" viewBox="0 50 840 440">
      <defs>
        <linearGradient
          id="gradient-1"
          gradientUnits="userSpaceOnUse"
          x1={420}
          y1={275}
          x2={420}
          y2={167}
          gradientTransform="matrix(1 0 0 -1 0 442)"
        >
          <stop
            offset={0.464}
            style={{
              stopOpacity: 0.2,
            }}
          />
          <stop
            offset={0.9}
            style={{
              stopOpacity: 0,
            }}
          />
        </linearGradient>
        <linearGradient
          id="gradient-2"
          gradientUnits="userSpaceOnUse"
          x1={420}
          y1={325}
          x2={420}
          y2={117.001}
          gradientTransform="matrix(1 0 0 -1 0 442)"
        >
          <stop
            offset={0.464}
            style={{
              stopOpacity: 0.2,
            }}
          />
          <stop
            offset={1}
            style={{
              stopOpacity: 0,
            }}
          />
        </linearGradient>
        <linearGradient
          id="gradient-3"
          gradientUnits="userSpaceOnUse"
          x1={420}
          y1={382}
          x2={420}
          y2={60.001}
          gradientTransform="matrix(1 0 0 -1 0 442)"
        >
          <stop
            offset={0.464}
            style={{
              stopOpacity: 0.16,
            }}
          />
          <stop
            offset={0.9}
            style={{
              stopOpacity: 0,
            }}
          />
        </linearGradient>
        <linearGradient
          id="gradient-4"
          gradientUnits="userSpaceOnUse"
          x1={420}
          y1={488.788}
          x2={420}
          y2={-46.967}
          gradientTransform="matrix(1 0 0 -1 0 442)"
        >
          <stop
            offset={0.089}
            style={{
              stopOpacity: 0.1,
            }}
          />
          <stop
            offset={0.464}
            style={{
              stopOpacity: 0.27,
            }}
          />
          <stop
            offset={0.896}
            style={{
              stopOpacity: 0,
            }}
          />
        </linearGradient>
        <linearGradient
          id="gradient-5"
          gradientUnits="userSpaceOnUse"
          x1={420}
          y1={610}
          x2={420}
          y2={-168.179}
          gradientTransform="matrix(1 0 0 -1 0 442)"
        >
          <stop
            offset={0.172}
            style={{
              stopOpacity: 0,
            }}
          />
          <stop
            offset={0.464}
            style={{
              stopOpacity: 0.21,
            }}
          />
          <stop
            offset={0.771}
            style={{
              stopOpacity: 0,
            }}
          />
        </linearGradient>
        <linearGradient
          id="gradient-vercel"
          gradientUnits="objectBoundingBox"
          x1={0}
          y1={0}
          x2={1.5}
          y2={1}
        >
          <stop
            offset={0.3}
            style={{
              stopColor: "var(--g1)",
            }}
          />
          <stop
            offset={0.5}
            style={{
              stopColor: "var(--g2)",
            }}
          />
          <stop
            offset={0.8}
            style={{
              stopColor: "var(--g1)",
            }}
          />
        </linearGradient>
        <linearGradient
          id="gradient-react"
          gradientUnits="objectBoundingBox"
          x1={0}
          y1={0}
          x2={1.1}
          y2={1}
        >
          <stop
            offset={0.3}
            style={{
              stopColor: "var(--react)",
            }}
          />
          <stop
            offset={0.5}
            style={{
              stopColor: "#BBF0FF",
            }}
          />
          <stop
            offset={0.8}
            style={{
              stopColor: "var(--react)",
            }}
          />
          city
        </linearGradient>
        <symbol id="react-logo" viewBox="-11.5 -10.23174 23 20.46348">
          <circle r={2.05} fill="#61dafb" />
          <g stroke="var(--react)" fill="none">
            <ellipse rx={11} ry={4.2} />
            <ellipse rx={11} ry={4.2} transform="rotate(60)" />
            <ellipse rx={11} ry={4.2} transform="rotate(120)" />
          </g>
        </symbol>
        <linearGradient id="#mask-gradient">
          <stop offset="0" stopColor="black" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
        <mask id="mask">
          <rect
            x="0"
            y="0"
            width="200"
            height="200"
            fill="url(#mask-gradient)"
          />
        </mask>
      </defs>
      <g className="orbits" transform="translate(420, 220)">
        <g>
          <circle
            className="orbit"
            style={{
              stroke: "url(#gradient-1)",
              animationDelay: "0",
            }}
            r={53.4}
          />
        </g>
        <g>
          <circle
            className="orbit"
            style={{
              stroke: "url(#gradient-2)",
              animationDelay: "0.03s",
            }}
            r={103.4}
          />
          <circle
            className="gray satellite"
            style={{
              animationDelay: "0.9s",
            }}
            cx={-69.6}
            cy={-76}
            r={5.8}
          />
        </g>
        <g>
          <circle
            className="orbit"
            style={{
              stroke: "url(#gradient-3)",
              animationDelay: "0.06s",
            }}
            r={160.4}
          />
          <circle
            className="orange satellite"
            style={{
              animationDelay: "0.8s",
            }}
            cx={102.4}
            cy={-123}
            r={5.8}
          />
        </g>
        <g>
          <circle
            className="orbit"
            style={{
              stroke: "url(#gradient-4)",
              animationDelay: "0.09s",
            }}
            r={267.3}
          />
          <circle
            className="orange satellite"
            style={{
              animationDelay: "0.6s",
            }}
            cx={-243.6}
            cy={111.4}
            r={5.8}
          />
          <circle
            className="gray satellite"
            style={{
              animationDelay: "1s",
            }}
            cx={250}
            cy={94.4}
            r={5.8}
          />
          <circle
            className="orange satellite"
            style={{
              animationDelay: "0.7s",
            }}
            cx={-236.6}
            cy={-123.6}
            r={5.8}
          />
        </g>
        <g>
          <circle
            className="orbit"
            style={{
              stroke: "url(#gradient-5)",
              animationDelay: "0.12s",
            }}
            r={388.5}
          />
        </g>
      </g>
      <symbol
        id="cloudflare-logo"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 209.51 94.74"
      >
        <path
          className="cls-1"
          d="M143.05,93.42l1.07-3.71c1.27-4.41.8-8.48-1.34-11.48-2-2.76-5.26-4.38-9.25-4.57L58,72.7a1.47,1.47,0,0,1-1.35-2,2,2,0,0,1,1.75-1.34l76.26-1c9-.41,18.84-7.75,22.27-16.71l4.34-11.36a2.68,2.68,0,0,0,.18-1,3.31,3.31,0,0,0-.06-.54,49.67,49.67,0,0,0-95.49-5.14,22.35,22.35,0,0,0-35,23.42A31.73,31.73,0,0,0,.34,93.45a1.47,1.47,0,0,0,1.45,1.27l139.49,0h0A1.83,1.83,0,0,0,143.05,93.42Z"
        />
        <path
          className="cls-2"
          d="M168.22,41.15q-1,0-2.1.06a.88.88,0,0,0-.32.07,1.17,1.17,0,0,0-.76.8l-3,10.26c-1.28,4.41-.81,8.48,1.34,11.48a11.65,11.65,0,0,0,9.24,4.57l16.11,1a1.44,1.44,0,0,1,1.14.62,1.5,1.5,0,0,1,.17,1.37,2,2,0,0,1-1.75,1.34l-16.73,1c-9.09.42-18.88,7.75-22.31,16.7l-1.21,3.16a.9.9,0,0,0,.79,1.22h57.63A1.55,1.55,0,0,0,208,93.63a41.34,41.34,0,0,0-39.76-52.48Z"
        />
      </symbol>
      <symbol
        id="next-logo"
        viewBox="0 0 1000 1000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M467.253 0.269139C465.103 0.464613 458.26 1.14878 452.102 1.63747C310.068 14.4411 177.028 91.0671 92.7664 208.841C45.8456 274.325 15.8358 348.605 4.49658 427.284C0.488759 454.748 0 462.86 0 500.098C0 537.336 0.488759 545.448 4.49658 572.912C31.6716 760.666 165.298 918.414 346.53 976.861C378.983 987.319 413.196 994.453 452.102 998.754C467.253 1000.42 532.747 1000.42 547.898 998.754C615.054 991.326 671.945 974.71 728.055 946.073C736.657 941.675 738.319 940.502 737.146 939.525C736.364 938.939 699.707 889.777 655.718 830.352L575.758 722.353L475.562 574.085C420.43 492.572 375.073 425.915 374.682 425.915C374.291 425.818 373.9 491.693 373.705 572.13C373.412 712.97 373.314 718.639 371.554 721.962C369.013 726.751 367.058 728.706 362.952 730.856C359.824 732.42 357.087 732.713 342.327 732.713H325.415L320.919 729.878C317.986 728.021 315.836 725.578 314.37 722.744L312.317 718.345L312.512 522.382L312.805 326.321L315.836 322.509C317.4 320.457 320.723 317.818 323.069 316.547C327.077 314.592 328.641 314.397 345.552 314.397C365.494 314.397 368.817 315.179 373.998 320.848C375.464 322.411 429.717 404.12 494.624 502.541C559.531 600.963 648.289 735.352 691.887 801.324L771.065 921.248L775.073 918.609C810.557 895.543 848.094 862.703 877.81 828.495C941.056 755.877 981.818 667.326 995.503 572.912C999.511 545.448 1000 537.336 1000 500.098C1000 462.86 999.511 454.748 995.503 427.284C968.328 239.53 834.702 81.7821 653.47 23.3352C621.505 12.975 587.488 5.84016 549.365 1.53972C539.98 0.562345 475.367 -0.51276 467.253 0.269139ZM671.945 302.668C676.637 305.014 680.45 309.51 681.818 314.201C682.6 316.743 682.796 371.085 682.6 493.549L682.307 669.281L651.32 621.781L620.235 574.281V446.538C620.235 363.95 620.626 317.525 621.212 315.277C622.776 309.803 626.197 305.503 630.89 302.962C634.897 300.909 636.364 300.714 651.711 300.714C666.178 300.714 668.719 300.909 671.945 302.668Z"
          fill="black"
        />
      </symbol>
      <use href="#cloudflare-logo" width={98} x={200} />
      <g id="center">
        <path
          d="M420 202 v36 M 402 220h36"
          style={{
            strokeWidth: 3.5625,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            stroke: "#999",
            fill: "none",
          }}
        />
      </g>
      <use href="#next-logo" width={60} x={550} />
    </svg>
  );
}

function Footer() {
  return (
    <footer>
      <p className="details">
        Built with{" "}
        <a rel="noreferrer" target="_blank" href="https://nextjs.org">
          Next.js
        </a>{" "}
        on{" "}
        <a rel="noreferrer"  target="_blank" href="https://cloudflare.com/pages">
          Cloudflare Pages
        </a>
      </p>

      <a
        rel="noreferrer" 
        target="_blank"
        href="https://github.com/vercel-labs/react-on-the-edge"
        className="source"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 0C5.37 0 0 5.50583 0 12.3035C0 17.7478 3.435 22.3463 8.205 23.9765C8.805 24.0842 9.03 23.715 9.03 23.3921C9.03 23.0999 9.015 22.131 9.015 21.1005C6 21.6696 5.22 20.347 4.98 19.6549C4.845 19.3012 4.26 18.2092 3.75 17.917C3.33 17.6863 2.73 17.1173 3.735 17.1019C4.68 17.0865 5.355 17.9939 5.58 18.363C6.66 20.2239 8.385 19.701 9.075 19.3781C9.18 18.5783 9.495 18.04 9.84 17.7325C7.17 17.4249 4.38 16.3637 4.38 11.6576C4.38 10.3196 4.845 9.21226 5.61 8.35102C5.49 8.04343 5.07 6.78232 5.73 5.09058C5.73 5.09058 6.735 4.76762 9.03 6.3517C9.99 6.07487 11.01 5.93645 12.03 5.93645C13.05 5.93645 14.07 6.07487 15.03 6.3517C17.325 4.75224 18.33 5.09058 18.33 5.09058C18.99 6.78232 18.57 8.04343 18.45 8.35102C19.215 9.21226 19.68 10.3042 19.68 11.6576C19.68 16.3791 16.875 17.4249 14.205 17.7325C14.64 18.1169 15.015 18.8552 15.015 20.0086C15.015 21.6542 15 22.9768 15 23.3921C15 23.715 15.225 24.0995 15.825 23.9765C18.2072 23.1519 20.2773 21.5822 21.7438 19.4882C23.2103 17.3942 23.9994 14.8814 24 12.3035C24 5.50583 18.63 0 12 0Z"
            fill="var(--fg)"
          />
        </svg>
        Source
      </a>
    </footer>
  );
}

export const config = {
  runtime: "experimental-edge",
};

export const getServerSideProps: GetServerSideProps<PageProps> = async (
  ctx
) => {
  return {
    props: {
      edgeAgent: ctx.req.headers["x-edge-user-agent"],
      ip: ctx.req.headers["cf-connecting-ip"] ?? "unknown",
      city: ctx.req.headers["x-cf-city"] ?? "unknown",
      isCold: ctx.req.headers["x-edge-is-cold"] === "true",
      isServer: true,
      runtime: "edge",
      generatedAt: Date.now(),
    },
  };
};
