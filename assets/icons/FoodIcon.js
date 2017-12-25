import React from 'react'
import { Path } from 'react-native-svg'

import createIcon from './createIcon'

export default createIcon(
  <Path
    stroke="#181C24"
    strokeWidth={0.2}
    d="M11.9130382,21.3795064 L8.82998614,26.0663245 C8.46611658,26.616009 7.89844118,26.9982785 7.25227404,27.1287472 C7.09879982,27.1593647 6.94269597,27.1748781 6.78619762,27.1750653 C6.33013162,27.1761429 5.88429268,27.0399704 5.50665863,26.7842559 C4.96735567,26.4236966 4.604006,25.8534686 4.50502857,25.2123336 C4.40270723,24.5733623 4.56699642,23.9203913 4.95952545,23.4059256 L9.20053137,17.9056449 C9.39638444,17.652235 9.76058404,17.605576 10.0139939,17.801429 C10.2674038,17.9972821 10.3140629,18.3614817 10.1182098,18.6148916 L5.87720386,24.1151723 C5.67829558,24.3773823 5.59657847,24.7101308 5.65139614,25.0346514 C5.70621381,25.359172 5.89269332,25.646617 6.16669232,25.828944 C6.42180932,25.9994554 6.73486942,26.0599804 7.0351577,25.9968473 C7.37756928,25.9282295 7.67859361,25.7261578 7.87177934,25.4352397 L10.9432519,20.7426318 C11.1214376,20.4816404 11.475987,20.4117419 11.7398973,20.585575 C12.0038077,20.7594082 12.0795761,21.1127496 11.9101433,21.3795064 L11.9130382,21.3795064 Z M24.0947126,0.628973668 C23.0149206,-0.141065633 21.5472141,-0.198963324 19.9666071,0.469755015 C18.3366476,1.21457831 16.9405001,2.38954399 15.9282431,3.86834952 C14.4634315,5.92371758 13.7773439,8.27725875 14.0957812,10.1647235 C14.1662538,10.6016185 14.1274664,11.0491649 13.9828807,11.4674216 C13.916172,11.6634105 13.9590896,11.8801005 14.0954667,12.0358664 C14.2318438,12.1916322 14.4409616,12.2628095 14.6440473,12.2225864 C14.8471331,12.1823633 15.0133333,12.0368507 15.080042,11.8408617 C15.2863208,11.2411232 15.3410187,10.5996664 15.2392606,9.97366112 C14.9758261,8.40463367 15.6011212,6.32321165 16.8719755,4.53996275 C17.7570981,3.23700587 18.9799206,2.1993079 20.4095245,1.53796743 C21.6080067,1.03425751 22.6733242,1.04583705 23.4144147,1.57560093 C24.1555051,2.10536481 24.5173657,3.10699487 24.4305192,4.40390317 C24.2725451,5.97142637 23.6911461,7.46645228 22.7485912,8.72886074 C21.4893164,10.5150045 19.7118573,11.7858589 18.1428299,12.0463985 C17.5300901,12.1518663 16.9520065,12.4041571 16.458007,12.7816992 C16.3230556,12.8847848 16.1944797,12.9959595 16.0729874,13.1146109 C15.8623035,13.3407022 15.8663257,13.6924037 16.0821252,13.9136175 C16.2979247,14.1348313 16.6494186,14.1475657 16.8806602,13.9425479 C16.9720329,13.8564767 17.0687192,13.7762271 17.1701486,13.7022725 C17.5137042,13.4385067 17.9159423,13.2617205 18.3425769,13.186983 C20.2329365,12.8714406 22.2333018,11.4500523 23.7010083,9.40047397 C24.7680648,7.96257291 25.4235506,6.26131206 25.5971577,4.47917017 C25.7013735,2.76829338 25.1687148,1.39901297 24.0947126,0.628973668 Z M11.4585413,11.1576689 C11.4317174,11.1100432 11.4317174,11.0518658 11.4585413,11.00424 C11.9717342,9.84436487 11.8353007,8.49983478 11.0995757,7.46669106 L5.92931178,0.252638671 C5.81091589,0.0791362776 5.60783674,-0.0166335442 5.39865028,0.00238473493 C5.18946383,0.0214030141 5.00698546,0.152225969 4.92182022,0.344235213 C4.83665498,0.536244457 4.86216286,0.759319218 4.98847429,0.92714678 L10.1529484,8.14119917 C10.6514197,8.84016289 10.7438695,9.75035258 10.3961187,10.5352687 C10.19711,10.9725914 10.2537881,11.4838057 10.5437578,11.8669156 L20.096877,24.2222831 C20.3537517,24.5442538 20.4121127,24.9816481 20.248642,25.3597051 C20.0851713,25.7377621 19.7265217,25.9948422 19.3159914,26.0282291 C18.9054611,26.061616 18.5099845,25.8658661 18.2875741,25.5191914 L9.62028963,12.5211596 C9.35217916,12.1194191 8.88531917,11.8971048 8.40443811,11.9421826 C7.54927617,12.0210064 6.7160595,11.6423717 6.21301047,10.9463423 L1.05722102,3.74965925 C0.93882513,3.57615686 0.735745977,3.48038704 0.526559521,3.49940532 C0.317373066,3.5184236 0.134894696,3.64924655 0.0497294555,3.8412558 C-0.0354357848,4.03326504 -0.00992789854,4.2563398 0.116383531,4.42416736 L5.27796275,11.6353249 C6.02131637,12.6662525 7.25474262,13.2268006 8.52023349,13.1088211 C8.57481078,13.1002938 8.62983653,13.1212036 8.66497772,13.1638239 L17.3206826,26.1589608 C17.6601043,26.6741271 18.1957621,27.027745 18.8028635,27.1374318 C18.9394332,27.1624534 19.0779891,27.1750494 19.216832,27.1750653 C20.0823654,27.1726993 20.8714026,26.6788609 21.2518306,25.9014111 C21.6322586,25.1239612 21.5380142,24.1979083 21.0087656,23.5130363 L11.4585413,11.1576689 Z M7.75887884,9.60022101 C7.97515273,9.60062063 8.17361861,9.48044656 8.27349319,9.28861429 C8.37336777,9.09678201 8.35799798,8.86527762 8.23363992,8.68833236 L3.51497804,1.94904104 C3.39655726,1.77942524 3.19664299,1.68587052 2.99054101,1.70361803 C2.78443903,1.72136553 2.60346113,1.84771901 2.51577993,2.03508231 C2.42809874,2.22244562 2.44703511,2.44235382 2.56545589,2.61196961 L7.28411777,9.35126093 C7.39210697,9.50692596 7.56942391,9.59990923 7.75887884,9.60022101 Z"
  />
)