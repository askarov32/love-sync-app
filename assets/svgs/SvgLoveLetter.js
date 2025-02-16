import * as React from "react";
import Svg, { Path, G, Polygon } from "react-native-svg";
const SvgLoveLetter = (props) => (
  <Svg
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 512 512"
    style={{
      enableBackground: "new 0 0 512 512",
    }}
    xmlSpace="preserve"
    {...props}
  >
    <Path
      style={{
        fill: "#FFFFFF",
      }}
      d="M89.946,247.924l93.634,81.444c3.807-19.063,17.15-34.664,34.467-40.204 c5.452-1.742,11.017-2.626,16.396-2.626c7.555,0.002,14.845,1.714,21.526,5.03c6.755-3.363,14.246-5.142,21.966-5.142 c5.601,0,11.333,0.92,17.029,2.74c17.318,5.542,30.234,21.156,34.034,40.234l93.056-81.463V27.676H89.946V247.924z M375.927,256 H137.225c-7.642,0-13.838-6.196-13.838-13.838c0-7.642,6.196-13.838,13.838-13.838h238.703c7.642,0,13.838,6.196,13.838,13.838 C389.765,249.804,383.569,256,375.927,256z M375.927,205.838H137.225c-7.642,0-13.838-6.196-13.838-13.838 c0-7.642,6.196-13.838,13.838-13.838h238.703c7.642,0,13.838,6.196,13.838,13.838C389.765,199.642,383.569,205.838,375.927,205.838z  M389.765,141.838c0,7.642-6.196,13.838-13.838,13.838H137.225c-7.642,0-13.838-6.196-13.838-13.838 c0-7.642,6.196-13.838,13.838-13.838h238.703C383.569,128,389.765,134.196,389.765,141.838z M137.225,57.081h76.108 c7.642,0,13.838,6.196,13.838,13.838s-6.196,13.838-13.838,13.838h-76.108c-7.642,0-13.838-6.196-13.838-13.838 S129.583,57.081,137.225,57.081z"
    />
    <Path d="M137.225,84.757h76.108c7.642,0,13.838-6.196,13.838-13.838s-6.196-13.838-13.838-13.838h-76.108 c-7.642,0-13.838,6.196-13.838,13.838S129.583,84.757,137.225,84.757z" />
    <Path d="M137.225,128c-7.642,0-13.838,6.196-13.838,13.838c0,7.642,6.196,13.838,13.838,13.838h238.703 c7.642,0,13.838-6.196,13.838-13.838c0-7.642-6.196-13.838-13.838-13.838H137.225z" />
    <Path d="M375.927,178.162H137.225c-7.642,0-13.838,6.196-13.838,13.838c0,7.642,6.196,13.838,13.838,13.838h238.703 c7.642,0,13.838-6.196,13.838-13.838C389.765,184.358,383.569,178.162,375.927,178.162z" />
    <Path d="M375.927,228.324H137.225c-7.642,0-13.838,6.196-13.838,13.838c0,7.642,6.196,13.838,13.838,13.838h238.703 c7.642,0,13.838-6.196,13.838-13.838C389.765,234.52,383.569,228.324,375.927,228.324z" />
    <G>
      <Path
        style={{
          fill: "#FF5F7B",
        }}
        d="M310.54,390.206c-8.436,10.155-19.499,19.933-33.076,29.191c-6.177,4.214-13.4,6.44-20.888,6.44 c-7.488,0-14.711-2.226-20.888-6.44c-13.577-9.258-24.64-19.036-33.078-29.191L82.197,484.324h348.76L310.54,390.206z"
      />
      <Polygon
        style={{
          fill: "#FF5F7B",
        }}
        points="185.488,368.014 55.351,254.469 55.351,469.732  "
      />
      <Polygon
        style={{
          fill: "#FF5F7B",
        }}
        points="326.538,368.035 456.649,469.732 456.649,254.476  "
      />
    </G>
    <Path d="M479.351,213.428c-0.067-0.066-29.622-23.827-29.622-23.827V13.838C449.73,6.196,444.11,0,436.468,0H76.684 C69.042,0,62.27,6.196,62.27,13.838V189.63c0,0-29.867,23.997-29.917,24.04c-3.269,2.873-4.677,6.974-4.677,11.056v273.436 c0,7.642,6.772,13.838,14.414,13.838h428.973c7.642,0,13.262-6.196,13.262-13.838V224.033 C484.324,219.871,482.448,216.017,479.351,213.428z M422.054,27.676v220.26l-93.051,81.465c-3.8-19.075-16.856-34.691-34.174-40.234 c-5.696-1.82-11.347-2.74-16.948-2.74c-7.72,0-15.156,1.778-21.912,5.143c-6.68-3.316-13.916-5.028-21.471-5.03 c-5.379,0-10.863,0.884-16.315,2.626c-17.316,5.54-30.798,21.142-34.607,40.204l-93.63-81.446V27.676H422.054z M226.615,315.527 c2.826-0.903,5.454-1.313,7.9-1.313c6.12,0.002,11.094,2.56,15.144,6.343c1.813,1.695,4.131,2.543,6.443,2.543 c2.368,0,4.729-0.889,6.54-2.669c3.966-3.902,9.112-6.327,15.312-6.327c2.671,0,5.535,0.45,8.586,1.424 c16.842,5.388,34.46,40.687-24.668,81.005c-1.591,1.085-3.442,1.628-5.296,1.628c-1.853,0-3.705-0.543-5.295-1.628 C192.152,356.214,209.768,320.915,226.615,315.527z M185.488,368.014L55.351,469.732V254.469L185.488,368.014z M202.61,390.206 c8.438,10.155,19.501,19.933,33.078,29.191c6.177,4.214,13.4,6.44,20.888,6.44c7.488,0,14.711-2.226,20.888-6.44 c13.577-9.258,24.64-19.036,33.076-29.191l120.415,94.118H82.197L202.61,390.206z M326.538,368.035l130.11-113.557v215.255 L326.538,368.035z" />
    <Path
      style={{
        fill: "#FFB8A7",
      }}
      d="M251.28,396.532c1.591,1.085,3.442,1.628,5.295,1.628s3.705-0.543,5.296-1.628 c59.127-40.318,41.51-75.617,24.668-81.005c-3.051-0.974-5.916-1.424-8.586-1.424c-6.199,0-11.345,2.425-15.312,6.327 c-1.811,1.78-4.172,2.669-6.54,2.669c-2.313,0-4.63-0.848-6.443-2.543c-4.049-3.783-9.024-6.341-15.144-6.343 c-2.446,0-5.075,0.408-7.9,1.313C209.768,320.915,192.152,356.214,251.28,396.532z"
    />
  </Svg>
);
export default SvgLoveLetter;
