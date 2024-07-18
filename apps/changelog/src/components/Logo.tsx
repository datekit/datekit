import { useId } from 'react'

export function Logo(props: React.ComponentPropsWithoutRef<'svg'>) {
  let id = useId()

  return (
    <svg viewBox="0 0 2336 517" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M0 62.5C0 27.9822 27.9822 0 62.5 0H395C429.518 0 457.5 27.9822 457.5 62.5V111.879H0V62.5Z"
            fill="url(#paint0_linear_463_1001)"
      />
      <path
        d="M0 112.773H457.5V378.75C457.5 413.267 429.518 441.25 395 441.25H62.5C27.9822 441.25 0 413.267 0 378.75V112.773Z"
        fill="url(#paint1_linear_463_1001)"
      />
      <path fillRule="evenodd" clipRule="evenodd"
            d="M345.955 199C336.335 199 328.078 205.849 326.3 215.303L321.917 238.602C314.576 241.256 307.59 244.656 301.05 248.711L279.971 237.557C271.477 233.063 261 235.263 255.026 242.796L237.533 264.854C231.558 272.388 231.777 283.122 238.054 290.412L253.634 308.505C250.981 316.393 249.176 324.673 248.328 333.236L226.668 343.221C217.936 347.246 213.294 356.914 215.612 366.242L222.421 393.634C224.74 402.962 233.365 409.312 242.958 408.755L266.905 407.363C270.766 413.102 275.141 418.464 279.964 423.383L273.893 446.72C271.47 456.032 276.01 465.763 284.701 469.885L310.052 481.909C318.742 486.03 329.122 483.375 334.761 475.589L348.62 456.451C352.351 456.826 356.135 457.019 359.964 457.019C364.046 457.019 368.077 456.8 372.047 456.374L386.494 475.825C392.226 483.543 402.637 486.072 411.277 481.846L436.482 469.515C445.122 465.289 449.544 455.504 447.01 446.221L440.618 422.809L440.438 422.897C445.147 418.035 449.422 412.749 453.2 407.1L477.042 408.485C486.636 409.042 495.26 402.692 497.579 393.364L504.388 365.973C506.707 356.644 502.064 346.977 493.333 342.951L471.568 332.918C470.706 324.453 468.908 316.265 466.28 308.462L481.907 290.313C488.184 283.023 488.403 272.289 482.429 264.756L464.935 242.698C458.961 235.164 448.484 232.964 439.99 237.458L418.807 248.667C412.288 244.632 405.326 241.246 398.011 238.602L393.628 215.303C391.85 205.849 383.593 199 373.973 199H345.955ZM413.957 344.407C413.957 374.316 389.784 398.562 359.964 398.562C330.144 398.562 305.971 374.316 305.971 344.407C305.971 314.498 330.144 290.252 359.964 290.252C389.784 290.252 413.957 314.498 413.957 344.407Z"
            fill="url(#paint2_linear_463_1001)"
      />
      <path d="M2183.79 404V72.5H2254.79V404H2183.79ZM2134.29 203V139.5H2308.79V203H2134.29Z" fill="white" />
      <path
        d="M2031.46 404V139.5H2102.46V404H2031.46ZM2066.46 85C2052.8 85 2042.13 81.6667 2034.46 75C2026.8 68.3333 2022.96 58.8333 2022.96 46.5C2022.96 35.1667 2026.8 26 2034.46 19C2042.46 11.6667 2053.13 8 2066.46 8C2080.13 8 2090.8 11.5 2098.46 18.5C2106.13 25.1667 2109.96 34.5 2109.96 46.5C2109.96 58.1667 2105.96 67.5 2097.96 74.5C2090.3 81.5 2079.8 85 2066.46 85Z"
        fill="white"
      />
      <path
        d="M1809.25 324.5L1788.25 266L1913.25 139.5H2006.75L1809.25 324.5ZM1741.75 404V34H1812.75V404H1741.75ZM1920.75 404L1825.75 284.5L1875.75 244.5L2006.25 404H1920.75Z"
        fill="white"
      />
      <path
        d="M1594.28 409C1565.62 409 1540.62 403.167 1519.28 391.5C1497.95 379.833 1481.28 363.833 1469.28 343.5C1457.28 323.167 1451.28 299.833 1451.28 273.5C1451.28 253.167 1454.62 234.5 1461.28 217.5C1467.95 200.5 1477.28 185.833 1489.28 173.5C1501.28 160.833 1515.45 151.167 1531.78 144.5C1548.45 137.5 1566.45 134 1585.78 134C1603.78 134 1620.45 137.333 1635.78 144C1651.12 150.333 1664.28 159.5 1675.28 171.5C1686.62 183.167 1695.28 197 1701.28 213C1707.28 229 1709.95 246.5 1709.28 265.5L1708.78 287.5H1496.28L1484.78 244H1650.28L1642.28 253V242C1641.62 233 1638.62 224.833 1633.28 217.5C1628.28 210.167 1621.78 204.5 1613.78 200.5C1605.78 196.5 1596.78 194.5 1586.78 194.5C1572.12 194.5 1559.62 197.333 1549.28 203C1539.28 208.667 1531.62 217 1526.28 228C1520.95 239 1518.28 252.333 1518.28 268C1518.28 284 1521.62 297.833 1528.28 309.5C1535.28 321.167 1544.95 330.333 1557.28 337C1569.95 343.333 1584.78 346.5 1601.78 346.5C1613.45 346.5 1624.12 344.667 1633.78 341C1643.45 337.333 1653.78 331 1664.78 322L1698.78 369.5C1689.12 378.167 1678.45 385.5 1666.78 391.5C1655.12 397.167 1643.12 401.5 1630.78 404.5C1618.45 407.5 1606.28 409 1594.28 409Z"
        fill="white"
      />
      <path d="M1319.95 404V72.5H1390.95V404H1319.95ZM1270.45 203V139.5H1444.95V203H1270.45Z" fill="white" />
      <path
        d="M1087.76 409C1065.76 409 1045.93 403 1028.26 391C1010.6 379 996.597 362.667 986.264 342C975.93 321.333 970.764 297.667 970.764 271C970.764 244.333 975.93 220.833 986.264 200.5C996.93 179.833 1011.26 163.667 1029.26 152C1047.26 140 1067.76 134 1090.76 134C1103.76 134 1115.6 136 1126.26 140C1137.26 143.667 1146.76 148.833 1154.76 155.5C1163.1 162.167 1170.1 169.833 1175.76 178.5C1181.43 187.167 1185.43 196.5 1187.76 206.5L1172.76 204V139.5H1243.26V404H1171.76V340.5L1187.76 339C1185.1 348.333 1180.76 357.167 1174.76 365.5C1168.76 373.833 1161.26 381.333 1152.26 388C1143.6 394.333 1133.76 399.5 1122.76 403.5C1111.76 407.167 1100.1 409 1087.76 409ZM1107.26 347.5C1120.6 347.5 1132.26 344.333 1142.26 338C1152.26 331.667 1159.93 322.833 1165.26 311.5C1170.93 299.833 1173.76 286.333 1173.76 271C1173.76 256 1170.93 242.833 1165.26 231.5C1159.93 220.167 1152.26 211.333 1142.26 205C1132.26 198.333 1120.6 195 1107.26 195C1094.26 195 1082.76 198.333 1072.76 205C1063.1 211.333 1055.43 220.167 1049.76 231.5C1044.1 242.833 1041.26 256 1041.26 271C1041.26 286.333 1044.1 299.833 1049.76 311.5C1055.43 322.833 1063.1 331.667 1072.76 338C1082.76 344.333 1094.26 347.5 1107.26 347.5Z"
        fill="white"
      />
      <path
        d="M636.928 404V54H780.428C806.094 54 829.261 58.3333 849.928 67C870.928 75.3333 888.928 87.3333 903.928 103C919.261 118.333 930.928 136.667 938.928 158C946.928 179.333 950.928 203 950.928 229C950.928 254.667 946.928 278.333 938.928 300C930.928 321.333 919.428 339.833 904.428 355.5C889.428 370.833 871.428 382.833 850.428 391.5C829.428 399.833 806.094 404 780.428 404H636.928ZM711.928 349.5L703.928 336.5H777.928C792.928 336.5 806.428 334 818.428 329C830.428 323.667 840.594 316.5 848.928 307.5C857.594 298.167 864.094 286.833 868.428 273.5C872.761 260.167 874.928 245.333 874.928 229C874.928 212.667 872.761 198 868.428 185C864.094 171.667 857.594 160.333 848.928 151C840.594 141.667 830.428 134.5 818.428 129.5C806.428 124.167 792.928 121.5 777.928 121.5H702.428L711.928 109.5V349.5Z"
        fill="white"
      />
      <defs>
        <linearGradient id="paint0_linear_463_1001" x1="0" y1="0" x2="457.585" y2="111.531"
                        gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#D94166" />
          <stop offset="1" stopColor="#BC2F58" />
        </linearGradient>
        <linearGradient id="paint1_linear_463_1001" x1="0" y1="112.773" x2="458.012" y2="440.534"
                        gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F2F2F3" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
        <linearGradient id="paint2_linear_463_1001" x1="215.019" y1="199" x2="521.138" y2="217.572"
                        gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#D94166" />
          <stop offset="1" stopColor="#BC2F58" />
        </linearGradient>
      </defs>
    </svg>
  )
}
