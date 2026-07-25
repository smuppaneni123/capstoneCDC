import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";

// ═══════════ DATA ═══════════
const R=[["Alabama A & M University",0,938,17,3.0],["University of Alabama at Birmingham",0,1258,26,3.7],["University of Alabama in Huntsville",0,1319,28,3.7],["Alabama State University",0,976,18,3.0],["The University of Alabama",0,1285,27,3.7],["Auburn University at Montgomery",0,1093,21,3.3],["Auburn University",0,1345,29,3.7],["Faulkner University",1,1020,19,3.2],["Huntingdon College",1,1142,23,3.4],["Heritage Christian University",1,1020,19,3.0],["Jacksonville State University",0,1059,20,3.2],["University of West Alabama",0,1015,19,3.1],["Marion Military Institute",0,1068,19,3.1],["University of Mobile",1,1220,25,3.4],["Samford University",1,1201,25,3.7],["University of South Alabama",0,1147,23,3.5],["Spring Hill College",1,1120,22,3.5],["Troy University",0,1088,21,3.3],["Tuskegee University",1,1120,22,3.3],["University of Arizona",0,1246,25,3.5],["Embry-Riddle Aeronautical University-Prescott",1,1250,26,3.6],["Grand Canyon University",1,1077,21,3.4],["University of Arkansas at Little Rock",0,1049,20,3.2],["University of Arkansas",0,1169,24,3.6],["University of Arkansas at Pine Bluff",0,922,16,2.9],["Arkansas State University",0,1090,21,3.3],["Arkansas Tech University",0,1049,20,3.3],["University of Central Arkansas",0,1118,22,3.3],["Central Baptist College",1,1046,20,3.0],["Harding University",1,1182,24,3.6],["Hendrix College",1,1282,27,3.7],["John Brown University",1,1195,24,3.6],["Ouachita Baptist University",1,1211,25,3.6],["University of the Ozarks",1,1105,22,3.3],["University of Arkansas Community College-Morrilton",0,1020,19,3.0],["Williams Baptist University",1,980,18,3.0],["Southern Arkansas University Main Campus",0,1047,20,3.2],["University of Arkansas-Fort Smith",0,1050,20,3.2],["Azusa Pacific University",1,1195,29,3.6],["Biola University",1,1261,26,3.7],["California Lutheran University",1,1266,26,3.6],["Chapman University",1,1357,30,3.8],["Claremont McKenna College",1,1527,34,3.94],["Dominican University of California",1,1290,0,3.5],["Harvey Mudd College",1,1545,35,4.0],["University of La Verne",1,1083,20,3.3],["Loyola Marymount University",1,1359,30,3.8],["Northeastern University Oakland",1,1472,32,3.8],["Occidental College",1,1452,33,3.9],["Otis College of Art and Design",1,1310,0,3.4],["Hope International University",1,1020,0,3.2],["University of the Pacific",1,1346,29,3.7],["Pepperdine University",1,1384,31,3.8],["Point Loma Nazarene University",1,1287,28,3.7],["Pomona College",1,1534,34,3.95],["University of Redlands",1,1241,26,3.6],["University of San Francisco",1,1295,28,3.7],["William Jessup University",1,1150,0,3.4],["Santa Clara University",1,1426,32,3.8],["Scripps College",1,1492,33,3.9],["University of Southern California",1,1495,33,3.9],["Thomas Aquinas College",1,1329,30,3.8],["Westmont College",1,1328,28,3.8],["University of Colorado Denver/Anschutz Medical Campus",0,1116,27,3.4],["University of Colorado Colorado Springs",0,1133,23,3.4],["University of Colorado Boulder",0,1357,31,3.7],["Colorado College",1,1365,31,3.9],["Colorado School of Mines",0,1412,32,3.9],["University of Denver",1,1355,31,3.8],["Fort Lewis College",0,1111,22,3.1],["Colorado Mesa University",0,1055,21,3.2],["Metropolitan State University of Denver",0,1019,22,3.0],["University of Northern Colorado",0,1082,24,3.3],["Regis University",1,1220,25,3.5],["Colorado State University Pueblo",0,1120,22,3.1],["United States Air Force Academy",0,1350,30,3.9],["Western Colorado University",0,1230,24,3.3],["Central Connecticut State University",0,1080,0,3.1],["Connecticut College",1,1432,32,3.8],["University of Connecticut",0,1348,31,3.7],["Eastern Connecticut State University",0,1160,0,3.2],["Fairfield University",1,1335,30,3.7],["University of Hartford",1,1219,28,3.3],["University of New Haven",1,1160,0,3.3],["Quinnipiac University",1,1242,28,3.5],["University of Saint Joseph",1,950,0,3.0],["Trinity College",1,1415,32,3.8],["United States Coast Guard Academy",0,1339,30,3.9],["Wesleyan University",1,1501,34,3.9],["Western Connecticut State University",0,1110,0,3.1],["Yale University",1,1534,34,3.95],["Delaware State University",0,940,23,3.0],["University of Delaware",0,1292,30,3.7],["American University",1,1381,31,3.8],["Gallaudet University",1,868,14,3.0],["George Washington University",1,1433,32,3.8],["Georgetown University",1,1487,33,3.9],["Howard University",1,1213,25,3.7],["Bethune-Cookman University",1,880,0,2.8],["Lynn University",1,1134,23,3.3],["University of Central Florida",0,1269,27,3.9],["Eckerd College",1,1250,26,3.6],["Embry-Riddle Aeronautical University-Daytona Beach",1,1257,26,3.7],["Florida Agricultural and Mechanical University",0,1107,22,3.3],["Florida Atlantic University",0,1127,23,3.5],["Flagler College",1,1084,21,3.3],["Florida College",1,1108,22,3.4],["Florida Institute of Technology",1,1225,26,3.6],["Florida International University",0,1163,24,3.7],["Florida Southern College",1,1252,27,3.6],["Florida State University",0,1361,30,3.9],["University of Florida",0,1403,31,4.0],["Jacksonville University",1,1205,25,3.5],["University of Miami",1,1415,32,3.9],["University of North Florida",0,1153,22,3.6],["Nova Southeastern University",1,1157,23,3.5],["Palm Beach Atlantic University",1,1075,22,3.3],["Rollins College",1,1271,27,3.7],["University of South Florida",0,1227,26,3.9],["Stetson University",1,1176,25,3.6],["Trinity Baptist College",1,907,18,2.8],["Warner University",1,932,17,2.9],["University of West Florida",0,1138,23,3.5],["Abraham Baldwin Agricultural College",0,990,19,2.9],["Agnes Scott College",1,1260,27,3.7],["Berry College",1,1220,25,3.7],["Brenau University",1,1079,20,3.2],["College of Coastal Georgia",0,1000,19,3.0],["Clayton  State University",0,958,17,2.9],["Columbus State University",0,977,19,3.0],["Covenant College",1,1294,27,3.6],["Emory University",1,1520,34,3.9],["Fort Valley State University",0,994,20,3.1],["Georgia Institute of Technology-Main Campus",0,1480,33,4.0],["Georgia Southwestern State University",0,978,17,3.0],["Georgia College & State University",0,1163,24,3.5],["Georgia Southern University",0,1053,20,3.3],["Georgia State University",0,1076,22,3.4],["University of Georgia",0,1397,32,3.9],["Gordon State College",0,1023,18,2.9],["Life University",1,1030,19,3.0],["Mercer University",1,1271,28,3.7],["Morehouse College",1,1090,21,3.4],["Oglethorpe University",1,1227,29,3.6],["Piedmont University",1,1129,21,3.2],["Savannah College of Art and Design",1,1173,24,3.5],["Shorter University",1,1115,22,3.2],["Spelman College",1,1220,25,3.7],["Thomas University",1,1072,22,2.9],["Toccoa Falls College",1,1130,22,3.2],["Valdosta State University",0,1013,19,3.1],["Wesleyan College",1,1075,21,3.2],["University of West Georgia",0,1032,19,3.1],["Chaminade University of Honolulu",1,1060,0,3.3],["University of Hawaii at Hilo",0,1028,19,3.2],["University of Hawaii at Manoa",0,1102,21,3.5],["Hawaii Pacific University",1,1111,22,3.3],["University of Hawaii-West Oahu",0,985,18,3.1],["Boise Bible College",1,1040,0,3.0],["University of Idaho",0,1116,24,3.4],["The College of Idaho",1,1180,26,3.5],["Northwest Nazarene University",1,1130,24,3.4],["Brigham Young University-Idaho",1,1118,23,3.5],["Augustana College",1,1165,25,3.6],["Aurora University",1,1076,26,3.3],["University of Chicago",1,1554,35,4.0],["DePaul University",1,1262,28,3.6],["Eastern Illinois University",0,1000,0,3.0],["Elmhurst University",1,1151,26,3.4],["Greenville University",1,1038,22,3.1],["University of Illinois Chicago",0,1250,28,3.5],["University of Illinois Urbana-Champaign",0,1440,32,3.8],["Illinois Wesleyan University",1,1275,29,3.7],["Illinois College",1,1064,21,3.3],["Illinois Institute of Technology",1,1311,29,3.7],["Illinois State University",0,1113,24,3.2],["Judson University",1,1039,21,3.1],["Knox College",1,1326,29,3.7],["Lake Forest College",1,1343,30,3.7],["Lewis University",1,1096,24,3.3],["Loyola University Chicago",1,1297,29,3.7],["Millikin University",1,1034,21,3.2],["Monmouth College",1,1128,24,3.3],["North Central College",1,1213,27,3.6],["Northwestern University",1,1533,34,3.97],["Olivet Nazarene University",1,1117,23,3.4],["Quincy University",1,1098,22,3.2],["Rockford University",1,956,20,3.0],["Roosevelt University",1,1011,23,3.0],["Dominican University",1,1002,19,3.3],["University of St Francis",1,1141,25,3.4],["University of Illinois Springfield",0,1102,24,3.2],["Southern Illinois University-Carbondale",0,1055,22,3.2],["Southern Illinois University Edwardsville",0,1100,24,3.2],["Trinity Christian College",1,1157,23,3.4],["Wheaton College",1,1380,30,3.9],["Anderson University",1,1035,21,3.5],["Ball State University",0,1160,23,3.3],["Bethel University",1,1014,18,3.6],["Butler University",1,1274,28,3.8],["DePauw University",1,1340,31,3.7],["Earlham College",1,1219,27,3.6],["Franklin College",1,1145,24,3.3],["Goshen College",1,950,0,3.4],["Grace College and Theological Seminary",1,1119,24,3.3],["Hanover College",1,1201,26,3.5],["Huntington University",1,1052,22,3.4],["Purdue University Fort Wayne",0,1100,25,3.2],["Indiana University-Indianapolis",0,1139,25,3.4],["University of Southern Indiana",0,1141,24,3.1],["Indiana University-Kokomo",0,1065,23,3.0],["Indiana University-South Bend",0,1081,22,3.0],["Indiana University-Bloomington",0,1313,30,3.8],["Indiana University-Northwest",0,1055,23,3.0],["Indiana University-Southeast",0,1072,22,3.0],["Indiana University-East",0,1061,21,3.0],["Indiana Wesleyan University-Marion",1,1082,21,3.4],["University of Notre Dame",1,1520,34,3.97],["Rose-Hulman Institute of Technology",1,1427,32,3.9],["University of Saint Francis-Fort Wayne",1,981,21,3.2],["Saint Mary's College",1,1246,28,3.6],["Taylor University",1,1220,27,3.7],["Valparaiso University",1,1178,27,3.6],["Wabash College",1,1180,26,3.6],["Buena Vista University",1,1120,22,3.3],["Central College",1,1147,23,3.4],["Clarke University",1,1054,20,3.2],["Coe College",1,1223,26,3.5],["Cornell College",1,1234,26,3.6],["Dordt University",1,1221,25,3.5],["Drake University",1,1292,27,3.7],["University of Dubuque",1,1110,22,3.0],["Emmaus Bible College",1,1161,23,3.1],["Faith Baptist Bible College and Theological Seminary",1,1109,22,3.0],["Grinnell College",1,1486,33,3.9],["Iowa State University",0,1204,24,3.6],["University of Iowa",0,1200,24,3.7],["Luther College",1,1218,25,3.5],["Mercy College of Health Sciences",1,980,18,3.1],["University of Northern Iowa",0,1122,22,3.3],["Saint Ambrose University",1,1093,23,3.2],["St Luke's College",1,980,18,3.2],["Simpson College",1,1440,32,3.3],["Upper Iowa University",1,1090,21,3.0],["Wartburg College",1,1136,23,3.4],["William Penn University",1,984,18,2.9],["Benedictine College",1,1252,25,3.6],["Emporia State University",0,1120,22,3.2],["Fort Hays State University",0,1089,21,3.1],["Friends University",1,1080,21,3.1],["University of Kansas",0,1190,24,3.6],["Kansas State University",0,1151,23,3.5],["Manhattan Christian College",1,1020,19,3.0],["McPherson College",1,1058,20,3.1],["MidAmerica Nazarene University",1,1048,20,3.3],["Ottawa University-Ottawa",1,1000,19,3.0],["Pittsburg State University",0,1050,20,3.1],["University of Saint Mary",1,1029,20,3.1],["Wichita State University",0,1092,21,3.3],["Alice Lloyd College",1,1015,19,3.2],["Bellarmine University",1,1210,25,3.6],["Berea College",1,1249,26,3.5],["Centre College",1,1352,29,3.7],["Eastern Kentucky University",0,1149,23,3.2],["Georgetown College",1,1138,23,3.4],["Kentucky Mountain Bible College",1,1080,21,3.0],["Kentucky State University",0,870,15,3.0],["Kentucky Wesleyan College",1,1044,20,3.1],["University of Kentucky",0,1215,25,3.7],["Kentucky Christian University",1,1090,21,3.1],["University of Louisville",0,1150,23,3.5],["Midway University",1,1122,22,3.0],["Murray State University",0,1133,23,3.3],["Northern Kentucky University",0,1087,21,3.2],["The Southern Baptist Theological Seminary",1,1120,22,3.0],["Spalding University",1,977,18,3.0],["Thomas More University",1,1180,24,3.3],["Transylvania University",1,1287,27,3.6],["Union Commonwealth University",1,980,18,3.0],["Western Kentucky University",0,971,18,3.3],["Centenary College of Louisiana",1,1144,23,3.4],["Dillard University",1,1050,20,3.0],["Grambling State University",0,943,17,2.9],["Louisiana State University-Alexandria",0,1022,19,3.0],["Louisiana State University and Agricultural & Mechanical College",0,1285,27,3.5],["Louisiana State University-Shreveport",0,1090,21,3.0],["Louisiana Tech University",0,1191,24,3.4],["McNeese State University",0,1087,21,3.1],["University of New Orleans",0,1052,20,3.1],["Nicholls State University",0,1090,21,3.0],["University of Louisiana at Monroe",0,1116,21,3.0],["Northwestern State University of Louisiana",0,1088,21,3.0],["Southeastern Louisiana University",0,1090,21,3.0],["Southern University and A & M College",0,942,17,2.9],["Southern University at New Orleans",0,944,17,2.8],["University of Louisiana at Lafayette",0,1219,25,3.3],["Tulane University of Louisiana",1,1448,32,3.9],["Xavier University of Louisiana",1,1080,22,3.5],["College of the Atlantic",1,1370,0,3.8],["Bates College",1,1468,33,3.9],["Bowdoin College",1,1520,34,3.95],["Colby College",1,1501,33,3.9],["University of Maine at Farmington",0,1130,0,3.1],["Maine Maritime Academy",0,1166,23,3.3],["Saint Joseph's College of Maine",1,1040,0,3.2],["University of Southern Maine",0,1116,25,3.0],["University of Baltimore",0,940,0,3.0],["Washington Adventist University",1,980,0,3.1],["Coppin State University",0,975,0,2.9],["Goucher College",1,1248,29,3.5],["Johns Hopkins University",1,1553,35,3.9],["Loyola University Maryland",1,1290,30,3.7],["University of Maryland-Baltimore County",0,1323,29,3.7],["University of Maryland-College Park",0,1473,34,3.9],["Maryland Institute College of Art",1,1258,29,3.5],["Morgan State University",0,971,18,2.9],["Mount St. Mary's University",1,1176,23,3.4],["Salisbury University",0,1252,27,3.6],["St. Mary's College of Maryland",0,1261,28,3.7],["St. John's College",1,1372,30,3.8],["Towson University",0,1095,23,3.5],["United States Naval Academy",0,1307,28,3.9],["Washington College",1,1280,31,3.5],["Amherst College",1,1533,34,3.97],["Babson College",1,1457,32,3.8],["Bay Path University",1,1120,0,3.0],["Bentley University",1,1352,30,3.7],["Boston College",1,1507,34,3.9],["Boston University",1,1480,33,3.8],["Brandeis University",1,1462,32,3.9],["Bridgewater State University",0,1180,28,3.2],["Clark University",1,1370,31,3.7],["Curry College",1,1125,0,2.9],["Emerson College",1,1358,31,3.7],["Emmanuel College",1,1250,0,3.6],["Endicott College",1,1274,28,3.3],["Fitchburg State University",0,1150,0,3.0],["Framingham State University",0,1180,0,3.1],["Gordon College",1,1265,28,3.6],["Harvard University",1,1553,35,4.0],["College of the Holy Cross",1,1353,30,3.8],["Lasell University",1,1100,0,3.0],["University of Massachusetts-Lowell",0,1285,29,3.5],["University of Massachusetts-Amherst",0,1423,32,3.8],["University of Massachusetts-Boston",0,1194,26,3.3],["MCPHS University",1,1269,29,3.6],["Massachusetts Institute of Technology",1,1560,35,4.0],["Mount Holyoke College",1,1463,33,3.8],["Nichols College",1,1140,0,2.9],["Northeastern University",1,1497,34,3.9],["Simmons University",1,1316,29,3.5],["Smith College",1,1500,34,3.9],["Springfield College",1,1275,29,3.3],["University of Massachusetts-Dartmouth",0,1182,28,3.2],["Suffolk University",1,1216,26,3.3],["Tufts University",1,1513,34,3.97],["Wellesley College",1,1520,34,3.9],["Wentworth Institute of Technology",1,1229,28,3.2],["Western New England University",1,1192,25,3.2],["Wheaton College (Massachusetts)",1,1308,31,3.5],["Williams College",1,1533,34,3.97],["Worcester State University",0,1150,0,3.1],["Adrian College",1,1034,23,3.2],["Andrews University",1,1150,23,3.4],["Aquinas College",1,1025,21,3.3],["Baker College",1,1080,0,2.8],["Calvin University",1,1233,27,3.7],["Central Michigan University",0,1091,24,3.4],["University of Detroit Mercy",1,1134,26,3.5],["Eastern Michigan University",0,1066,23,3.3],["Ferris State University",0,1012,21,3.2],["Kettering University",1,1251,28,3.8],["Grand Valley State University",0,1074,26,3.5],["Hillsdale College",1,1415,31,3.9],["Hope College",1,1249,29,3.8],["Kalamazoo College",1,1280,26,3.8],["Madonna University",1,980,0,3.1],["University of Michigan-Ann Arbor",0,1465,33,3.9],["Michigan State University",0,1269,28,3.7],["Michigan Technological University",0,1258,28,3.8],["University of Michigan-Dearborn",0,1115,26,3.6],["University of Michigan-Flint",0,1102,23,3.3],["Oakland University",0,1120,0,3.5],["Saginaw Valley State University",0,1052,22,3.2],["Siena Heights University",1,954,19,3.0],["Spring Arbor University",1,1170,0,3.3],["Wayne State University",0,1156,26,3.4],["Bemidji State University",0,1090,21,3.1],["Bethany Lutheran College",1,1150,23,3.3],["Bethel University",1,1249,26,3.6],["Carleton College",1,1517,34,3.9],["Concordia College at Moorhead",1,1190,24,3.5],["Martin Luther College",1,1090,21,3.4],["Gustavus Adolphus College",1,1290,27,3.6],["Hamline University",1,1160,23,3.4],["Macalester College",1,1440,32,3.9],["Minnesota State University-Mankato",0,1150,23,3.2],["Metropolitan State University",0,1020,19,3.0],["University of Minnesota-Twin Cities",0,1362,29,3.7],["Minneapolis College of Art and Design",1,1161,23,3.2],["University of Minnesota-Duluth",0,1251,26,3.5],["University of Minnesota-Morris",0,1150,23,3.6],["Minnesota State University Moorhead",0,1090,21,3.1],["University of Northwestern-St Paul",1,1173,24,3.4],["College of Saint Benedict",1,1151,23,3.5],["Saint Cloud State University",0,1092,21,3.1],["Saint Johns University",1,1183,24,3.5],["St Olaf College",1,1380,30,3.8],["The College of Saint Scholastica",1,1120,22,3.4],["University of St Thomas",1,1296,27,3.5],["St Catherine University",1,1147,23,3.5],["Southwest Minnesota State University",0,1050,20,3.1],["Dunwoody College of Technology",1,1120,22,3.0],["Alcorn State University",0,904,16,3.0],["Belhaven University",1,1124,22,3.3],["Blue Mountain Christian University",1,1090,21,3.1],["Delta State University",0,1050,20,3.1],["Jackson State University",0,965,18,2.9],["Millsaps College",1,1181,24,3.6],["University of Mississippi",0,1184,25,3.5],["Mississippi University for Women",0,1090,21,3.2],["Mississippi Valley State University",0,870,15,2.7],["Mississippi College",1,1090,21,3.5],["Mississippi State University",0,1219,25,3.5],["University of Southern Mississippi",0,1190,24,3.4],["William Carey University",1,1122,22,3.3],["Avila University",1,972,18,3.2],["Calvary University",1,1050,20,3.0],["Central Methodist University-College of Liberal Arts and Sciences",1,1048,20,3.2],["University of Central Missouri",0,1050,20,3.2],["Drury University",1,1218,25,3.5],["Evangel University",1,1188,24,3.4],["Hannibal-LaGrange University",1,1090,21,3.1],["Lindenwood University",1,1190,24,3.2],["Missouri Baptist University",1,910,16,3.2],["Missouri Southern State University",0,1065,20,3.0],["Missouri Valley College",1,974,17,3.0],["University of Missouri-Columbia",0,1247,26,3.6],["University of Missouri-Kansas City",0,1204,24,3.4],["Missouri University of Science and Technology",0,1317,28,3.7],["University of Missouri-St Louis",0,1199,24,3.3],["Truman State University",0,1320,28,3.7],["Northwest Missouri State University",0,1119,22,3.2],["College of the Ozarks",1,1118,22,3.5],["Rockhurst University",1,1120,22,3.6],["Saint Louis University",1,1317,28,3.8],["University of Health Sciences and Pharmacy in St. Louis",1,1131,22,3.6],["Southwest Baptist University",1,1088,21,3.3],["Southeast Missouri State University",0,950,17,3.2],["Missouri State University-Springfield",0,1122,22,3.4],["Washington University in St Louis",1,1530,34,3.97],["Webster University",1,1102,21,3.4],["Westminster College",1,1118,22,3.4],["William Jewell College",1,1095,21,3.5],["Carroll College",1,1200,25,3.6],["University of Providence",1,980,18,3.1],["Montana Technological University",0,1126,22,3.3],["Montana State University",0,1183,24,3.4],["The University of Montana",0,1190,24,3.2],["Rocky Mountain College",1,1083,21,3.2],["Creighton University",1,1321,28,3.8],["Hastings College",1,1320,28,3.3],["University of Nebraska at Kearney",0,1118,22,3.3],["Midland University",1,1086,21,3.2],["University of Nebraska at Omaha",0,1120,22,3.3],["Nebraska Wesleyan University",1,1189,24,3.4],["University of Nebraska-Lincoln",0,1191,24,3.6],["College of Saint Mary",1,1150,23,3.1],["York University",1,1022,20,3.0],["University of Nevada-Las Vegas",0,1094,21,3.3],["University of Nevada-Reno",0,1132,22,3.5],["Dartmouth College",1,1534,34,3.97],["Franklin Pierce University",1,1175,0,3.0],["University of New Hampshire-Main Campus",0,1218,28,3.5],["University of New Hampshire at Manchester",0,1100,0,3.2],["Rivier University",1,1070,0,3.1],["Saint Anselm College",1,1201,25,3.5],["Caldwell University",1,1260,0,3.2],["Drew University",1,1227,26,3.5],["Rowan University",0,1212,26,3.4],["Kean University",0,1040,0,3.1],["Monmouth University",1,1223,26,3.5],["Montclair State University",0,1070,0,3.4],["New Jersey Institute of Technology",0,1337,31,3.7],["Princeton University",1,1553,35,3.95],["Ramapo College of New Jersey",0,1211,25,3.5],["Rider University",1,1227,30,3.2],["Rutgers University-Camden",0,1178,22,3.5],["Rutgers University-New Brunswick",0,1410,31,3.8],["Seton Hall University",1,1322,30,3.5],["Stevens Institute of Technology",1,1446,33,3.9],["Stockton University",0,1139,22,3.4],["The College of New Jersey",0,1246,28,3.7],["Eastern New Mexico University-Main Campus",0,964,20,3.0],["New Mexico Institute of Mining and Technology",0,1207,25,3.6],["University of New Mexico-Main Campus",0,1038,23,3.3],["New Mexico State University-Main Campus",0,1011,20,3.2],["Adelphi University",1,1219,27,3.5],["Albany College of Pharmacy and Health Sciences",1,1252,28,3.7],["Alfred University",1,1279,28,3.4],["Bard College",1,1380,30,3.8],["Barnard College",1,1520,34,3.95],["Clarkson University",1,1304,28,3.7],["Colgate University",1,1508,34,3.9],["Columbia University in the City of New York",1,1553,35,3.97],["The Cooper Union for the Advancement of Science and Art",1,1410,31,3.9],["Cornell University",1,1535,34,3.9],["Culinary Institute of America",1,1060,20,3.2],["CUNY Bernard M Baruch College",0,1280,0,3.6],["CUNY Brooklyn College",0,1140,0,3.4],["College of Staten Island CUNY",0,1040,0,3.1],["CUNY City College",0,1260,0,3.4],["CUNY Hunter College",0,1280,0,3.5],["CUNY John Jay College of Criminal Justice",0,1080,0,3.1],["CUNY Lehman College",0,970,0,3.1],["CUNY Medgar Evers College",0,920,0,2.9],["CUNY New York City College of Technology",0,1010,0,3.0],["CUNY Queens College",0,1120,0,3.5],["CUNY York College",0,880,0,3.1],["D'Youville  University",1,1130,0,3.2],["Elmira College",1,1314,28,3.3],["Fordham University",1,1418,32,3.8],["Hamilton College",1,1506,34,3.9],["Hartwick College",1,1200,0,3.2],["Hobart William Smith Colleges",1,1319,30,3.5],["Hofstra University",1,1319,30,3.6],["Houghton University",1,1284,29,3.5],["Iona University",1,1217,27,3.3],["Ithaca College",1,1312,28,3.6],["Jewish Theological Seminary of America",1,1500,0,3.8],["LIM College",1,1035,20,3.0],["Le Moyne College",1,1255,29,3.4],["Long Island University",1,1224,26,3.3],["Manhattan University",1,1270,26,3.4],["Marist University",1,1295,29,3.6],["Marymount Manhattan College",1,1214,26,3.3],["Molloy University",1,1187,25,3.4],["Mount Saint Mary College",1,1150,23,3.2],["University of Mount Saint Vincent",1,1090,0,3.1],["Nazareth University",1,1216,24,3.4],["New York University",1,1520,34,3.9],["Niagara University",1,1168,25,3.3],["New York Institute of Technology",1,1311,28,3.4],["Pace University",1,1266,27,3.3],["Pratt Institute-Main",1,1290,29,3.5],["Rensselaer Polytechnic Institute",1,1456,33,3.8],["Roberts Wesleyan University",1,1170,0,3.3],["Rochester Institute of Technology",1,1383,32,3.7],["University of Rochester",1,1488,33,3.9],["St Bonaventure University",1,1197,26,3.4],["St Lawrence University",1,1371,32,3.7],["St. Thomas Aquinas College",1,1000,0,3.1],["Sarah Lawrence College",1,1366,30,3.7],["Siena College",1,1254,31,3.5],["Skidmore College",1,1405,32,3.8],["St. Joseph's University-New York",1,1190,26,3.1],["St. John Fisher University",1,1214,27,3.5],["St. John's University-New York",1,1244,27,3.6],["SUNY College of Technology at Alfred",0,1094,22,3.0],["SUNY College of Technology at Delhi",0,1004,20,3.0],["Farmingdale State College",0,1147,25,3.0],["SUNY Morrisville",0,1130,0,3.0],["Binghamton University",0,1415,32,3.8],["University at Buffalo",0,1295,29,3.7],["Stony Brook University",0,1419,31,3.9],["SUNY Polytechnic Institute",0,1201,25,3.4],["SUNY Brockport",0,1193,25,3.2],["SUNY Buffalo State University",0,1070,0,3.0],["SUNY at Fredonia",0,1250,27,3.2],["SUNY College at Geneseo",0,1286,30,3.7],["State University of New York at New Paltz",0,1265,28,3.5],["SUNY Oneonta",0,1230,28,3.3],["State University of New York at Oswego",0,1187,26,3.3],["SUNY at Purchase College",0,1312,29,3.5],["State University of New York at Plattsburgh",0,1165,24,3.2],["SUNY Maritime College",0,1214,27,3.3],["Syracuse University",1,1375,31,3.6],["Touro University",1,1348,30,3.3],["Union College",1,1395,31,3.5],["United States Merchant Marine Academy",0,1207,25,3.8],["United States Military Academy",0,1355,31,3.9],["Utica University",1,1110,0,3.0],["Vassar College",1,1494,33,3.9],["School of Visual Arts",1,1320,0,3.2],["Wagner College",1,1243,26,3.5],["Webb Institute",1,1496,34,3.9],["Yeshiva University",1,1426,31,3.7],["Appalachian State University",0,1214,25,3.8],["Belmont Abbey College",1,1099,22,3.4],["Bennett College",1,925,0,2.7],["Brevard College",1,1060,20,3.0],["Cabarrus College of Health Sciences",1,1150,23,3.2],["Catawba College",1,1096,21,3.1],["Davidson College",1,1469,33,3.9],["Duke University",1,1548,35,3.97],["East Carolina University",0,1180,24,3.4],["Elizabeth City State University",0,1019,19,2.9],["Elon University",1,1208,25,3.8],["Fayetteville State University",0,959,17,3.0],["Gardner-Webb University",1,1113,22,3.3],["Guilford College",1,1105,21,3.2],["High Point University",1,1288,30,3.6],["Meredith College",1,1204,25,3.5],["Methodist University",1,1182,24,3.1],["University of Mount Olive",1,1050,20,3.1],["North Carolina A & T State University",0,1074,20,3.1],["University of North Carolina Asheville",0,1251,26,3.7],["University of North Carolina at Chapel Hill",0,1439,31,4.0],["University of North Carolina at Charlotte",0,1231,25,3.6],["University of North Carolina at Greensboro",0,1193,24,3.2],["North Carolina Central University",0,1050,20,3.1],["University of North Carolina School of the Arts",0,1260,26,3.5],["North Carolina State University at Raleigh",0,1376,30,3.9],["University of North Carolina Wilmington",0,1287,27,3.8],["William Peace University",1,1170,24,3.0],["University of North Carolina at Pembroke",0,1056,20,3.0],["Queens University of Charlotte",1,1206,24,3.5],["Mid-Atlantic Christian University",1,1000,0,3.0],["Salem College",1,1082,19,3.2],["Southeastern Baptist Theological Seminary",1,1127,23,3.0],["Wake Forest University",1,1475,33,3.9],["Warren Wilson College",1,1350,29,3.3],["Wingate University",1,1111,22,3.4],["Winston-Salem State University",0,945,17,3.0],["Western Carolina University",0,1157,23,3.4],["University of Mary",1,1159,23,3.3],["Minot State University",0,1051,20,3.1],["North Dakota State University-Main Campus",0,1150,23,3.4],["Valley City State University",0,1041,20,3.0],["University of Akron Main Campus",0,1081,21,3.2],["University of Akron Wayne College",0,1040,20,3.0],["Ashland University",1,1120,22,3.4],["Aultman College of Nursing and Health Sciences",1,1020,19,3.3],["Baldwin Wallace University",1,1194,25,3.5],["Bluffton University",1,976,18,3.3],["Bowling Green State University-Main Campus",0,1117,22,3.3],["Capital University",1,1068,21,3.4],["Case Western Reserve University",1,1513,34,3.9],["Cedarville University",1,1241,26,3.8],["The Christ College of Nursing and Health Sciences",1,1090,21,3.3],["University of Cincinnati-Main Campus",0,1282,27,3.7],["Cleveland Institute of Art",1,1193,26,3.2],["University of Dayton",1,1335,29,3.7],["Denison University",1,1410,31,3.8],["John Carroll University",1,1298,29,3.6],["Kent State University at Kent",0,1099,21,3.4],["Kenyon College",1,1429,32,3.9],["Kettering College",1,1050,20,3.4],["Malone University",1,1081,21,3.4],["Marietta College",1,1088,21,3.4],["Mercy College of Ohio",1,947,17,3.1],["Miami University-Oxford",0,1317,28,3.8],["University of Mount Union",1,1088,21,3.3],["Mount Vernon Nazarene University",1,1131,22,3.4],["Mount St. Joseph University",1,1183,25,3.2],["Muskingum University",1,1017,19,3.1],["Oberlin College",1,1447,32,3.9],["Ohio Northern University",1,1252,26,3.6],["Ohio State University-Main Campus",0,1387,30,3.8],["Ohio University-Main Campus",0,1212,25,3.5],["Otterbein University",1,1220,25,3.4],["Franciscan University of Steubenville",1,1220,25,3.8],["Tiffin University",1,986,18,2.9],["University of Toledo",0,1235,26,3.4],["Ursuline College",1,1097,22,3.0],["Walsh University",1,1193,24,3.3],["Wilmington College",1,1029,19,3.1],["Wittenberg University",1,1179,24,3.4],["The College of Wooster",1,1353,30,3.7],["Xavier University",1,1217,25,3.6],["Youngstown State University",0,1120,22,3.0],["University of Central Oklahoma",0,1090,21,3.2],["East Central University",0,1049,20,3.1],["Randall University",1,980,18,3.0],["Northeastern State University",0,1049,20,3.1],["Northwestern Oklahoma State University",0,1003,19,3.0],["Oklahoma Christian University",1,1122,22,3.6],["Oklahoma State University-Main Campus",0,1150,23,3.5],["Oklahoma Baptist University",1,1024,18,3.5],["Oklahoma City University",1,1177,24,3.4],["University of Oklahoma-Norman Campus",0,1246,26,3.7],["Oral Roberts University",1,1196,24,3.5],["University of Science and Arts of Oklahoma",0,1152,23,3.2],["Southeastern Oklahoma State University",0,1087,21,3.0],["University of Tulsa",1,1389,30,3.7],["George Fox University",1,1197,24,3.6],["Bushnell University",1,1020,19,3.2],["Oregon Institute of Technology",0,1150,23,3.2],["Oregon State University",0,1290,27,3.5],["University of Oregon",0,1272,27,3.6],["Pacific University",1,1090,20,3.5],["University of Portland",1,1277,26,3.7],["Reed College",1,1437,33,3.9],["Willamette University",1,1377,31,3.7],["Allegheny College",1,1275,29,3.6],["DeSales University",1,1186,28,3.4],["Alvernia University",1,1170,0,3.2],["Arcadia University",1,1190,0,3.5],["Bryn Mawr College",1,1396,31,3.9],["Bucknell University",1,1410,32,3.8],["Carlow University",1,1080,0,3.1],["Carnegie Mellon University",1,1546,35,3.9],["Chatham University",1,1198,26,3.3],["DLP Conemaugh Memorial Medical Center",1,1070,0,3.0],["Delaware Valley University",1,1204,27,3.3],["Dickinson College",1,1391,32,3.8],["Drexel University",1,1345,30,3.7],["Duquesne University",1,1276,29,3.7],["East Stroudsburg University of Pennsylvania",0,1084,23,3.1],["Elizabethtown College",1,1204,27,3.7],["Franklin and Marshall College",1,1392,32,3.8],["Gettysburg College",1,1379,31,3.8],["Grove City College",1,1272,27,3.8],["Gwynedd Mercy University",1,1090,0,3.1],["Haverford College",1,1513,34,3.95],["Holy Family University",1,1060,0,3.2],["Immaculata University",1,1260,0,3.2],["Indiana University of Pennsylvania-Main Campus",0,1082,22,3.1],["Juniata College",1,1227,27,3.6],["King's College",1,1170,0,3.3],["Kutztown University of Pennsylvania",0,1210,0,3.1],["La Roche University",1,1055,16,3.1],["Lafayette College",1,1424,31,3.5],["Lancaster Bible College",1,1180,0,3.2],["Lebanon Valley College",1,1240,0,3.5],["Lehigh University",1,1440,32,3.8],["Lincoln University",0,920,0,3.0],["Lycoming College",1,1160,0,3.3],["Manor College",1,820,0,3.0],["Marywood University",1,1162,24,3.3],["Messiah University",1,1236,27,3.7],["Millersville University of Pennsylvania",0,1110,0,3.2],["Moore College of Art and Design",1,1282,30,3.2],["Moravian University",1,1183,25,3.4],["Mount Aloysius College",1,1070,0,3.1],["Muhlenberg College",1,1343,30,3.7],["Pennsylvania State University-Penn State Erie-Behrend College",0,1228,27,3.3],["Pennsylvania State University-Penn State New Kensington",0,1190,0,3.1],["Pennsylvania State University-Penn State Wilkes-Barre",0,1200,0,3.1],["Pennsylvania State University-Penn State Scranton",0,1190,0,3.1],["Pennsylvania State University-Penn State Lehigh Valley",0,1210,0,3.1],["Pennsylvania State University-Penn State Altoona",0,1187,26,3.3],["Pennsylvania State University-Penn State Beaver",0,1214,27,3.1],["Pennsylvania State University-Penn State Berks",0,1174,20,3.2],["Pennsylvania State University-Penn State Harrisburg",0,1227,27,3.4],["Pennsylvania State University-Penn State Brandywine",0,1200,0,3.2],["Pennsylvania State University-Penn State DuBois",0,1080,0,3.0],["Pennsylvania State University-Penn State Fayette- Eberly",0,1170,0,3.0],["Pennsylvania State University-Penn State Hazleton",0,1200,0,3.0],["Pennsylvania State University-Main Campus",0,1337,30,3.6],["Pennsylvania State University-Penn State Greater Allegheny",0,1160,0,3.0],["Pennsylvania State University-Penn State Mont Alto",0,1160,0,3.0],["Pennsylvania State University-Penn State Abington",0,1181,26,3.2],["Pennsylvania State University-Penn State Schuylkill",0,1130,0,3.0],["Pennsylvania State University-Penn State York",0,1140,25,3.1],["University of Pennsylvania",1,1553,35,3.97],["Cairn University-Langhorne",1,1110,0,3.2],["University of Pittsburgh-Bradford",0,1125,24,3.2],["University of Pittsburgh-Greensburg",0,1160,25,3.2],["University of Pittsburgh-Johnstown",0,1105,25,3.2],["University of Pittsburgh-Pittsburgh Campus",0,1370,31,3.8],["Saint Francis University",1,1155,25,3.4],["Saint Joseph's University - Philadelphia",1,1258,29,3.7],["Saint Vincent College",1,1116,22,3.4],["University of Scranton",1,1237,27,3.6],["Seton Hill University",1,1117,23,3.3],["Shippensburg University of Pennsylvania",0,1120,22,3.1],["Slippery Rock University of Pennsylvania",0,1095,22,3.3],["Susquehanna University",1,1232,26,3.5],["Swarthmore College",1,1534,34,3.97],["Thomas Jefferson University",1,1243,27,3.4],["Ursinus College",1,1310,29,3.6],["Villanova University",1,1460,33,3.9],["Waynesburg University",1,1090,21,3.3],["West Chester University of Pennsylvania",0,1187,27,3.5],["Widener University",1,1180,0,3.2],["Wilkes University",1,1136,27,3.3],["Wilson College",1,1000,0,3.0],["York College of Pennsylvania",1,1162,24,3.2],["Brown University",1,1546,35,3.97],["Bryant University",1,1265,28,3.5],["Johnson & Wales University-Providence",1,1050,25,3.0],["Providence College",1,1346,31,3.7],["Rhode Island College",0,990,0,3.0],["University of Rhode Island",0,1160,0,3.5],["Rhode Island School of Design",1,1473,32,3.7],["Roger Williams University",1,1223,26,3.3],["Salve Regina University",1,1232,28,3.4],["Anderson University",1,1202,25,3.5],["Charleston Southern University",1,1059,21,3.3],["Southern Wesleyan University",1,1140,24,3.3],["College of Charleston",0,1247,27,3.8],["Citadel Military College of South Carolina",0,1208,25,3.5],["Clemson University",0,1353,31,3.9],["Converse University",1,1138,23,3.4],["Francis Marion University",0,1015,20,3.1],["Furman University",1,1371,31,3.8],["Lander University",0,1057,20,3.1],["North Greenville University",1,1156,23,3.3],["Presbyterian College",1,1118,23,3.6],["University of South Carolina Aiken",0,1120,22,3.2],["University of South Carolina-Columbia",0,1297,29,3.8],["Coastal Carolina University",0,1143,23,3.5],["University of South Carolina-Upstate",0,1099,23,3.2],["Winthrop University",0,1139,24,3.6],["Wofford College",1,1296,28,3.7],["Augustana University",1,1195,24,3.6],["Black Hills State University",0,1087,21,3.1],["Dakota State University",0,1215,24,3.3],["Mount Marty University",1,1120,22,3.2],["Northern State University",0,1089,21,3.2],["South Dakota School of Mines and Technology",0,1245,26,3.6],["South Dakota State University",0,1120,22,3.4],["University of South Dakota",0,1125,22,3.4],["Austin Peay State University",0,1088,21,3.2],["Baptist Health Sciences University",1,1050,20,3.4],["Belmont University",1,1280,27,3.8],["Bethel University",1,972,18,3.6],["Carson-Newman University",1,1117,22,3.3],["Christian Brothers University",1,1098,21,3.5],["Lipscomb University",1,1256,26,3.7],["East Tennessee State University",0,1144,23,3.3],["Fisk University",1,1200,21,3.3],["Freed-Hardeman University",1,1109,22,3.4],["John A Gupton College",1,1020,19,3.0],["Johnson University",1,1078,21,3.2],["Lee University",1,1145,23,3.4],["Lincoln Memorial University",1,1092,21,3.4],["The University of Tennessee Southern",0,1083,21,3.2],["University of Memphis",0,1088,21,3.3],["Middle Tennessee State University",0,1121,22,3.3],["Rhodes College",1,1362,29,3.9],["The University of the South",1,1344,29,3.8],["Southern Adventist University",1,1129,22,3.4],["Tennessee Wesleyan University",1,1090,21,3.1],["The University of Tennessee-Chattanooga",0,1147,23,3.4],["The University of Tennessee-Knoxville",0,1311,28,3.8],["The University of Tennessee-Martin",0,1120,22,3.3],["Tennessee State University",0,1000,19,3.0],["Tennessee Technological University",0,1151,23,3.5],["Trevecca Nazarene University",1,1091,21,3.4],["Union University",1,1256,26,3.7],["Vanderbilt University",1,1549,35,3.97],["Abilene Christian University",1,1194,25,3.6],["Angelo State University",0,1054,21,3.3],["Austin College",1,1212,26,3.6],["Baylor University",1,1329,30,3.8],["Texas A & M University-Corpus Christi",0,1086,22,3.3],["Dallas Baptist University",1,1120,23,3.6],["Dallas Christian College",1,931,17,3.0],["University of Dallas",1,1227,25,3.8],["East Texas A&M University",0,1076,22,3.4],["Hardin-Simmons University",1,1108,22,3.3],["Houston Christian University",1,1084,20,3.4],["University of Houston-Clear Lake",0,1060,22,3.4],["University of Houston-Downtown",0,1029,19,3.0],["University of Houston",0,1250,26,3.5],["Howard Payne University",1,1026,21,3.2],["Huston-Tillotson University",1,1014,22,2.8],["Lamar University",0,1061,22,3.0],["Texas A & M International University",0,993,19,3.1],["LeTourneau University",1,1208,25,3.6],["Lubbock Christian University",1,1100,23,3.3],["University of Mary Hardin-Baylor",1,1099,23,3.4],["McMurry University",1,1043,20,3.0],["University of North Texas",0,1109,23,3.5],["The University of Texas Rio Grande Valley",0,985,18,3.1],["Prairie View A & M University",0,980,19,3.0],["Rice University",1,1553,35,3.96],["Saint Edward's University",1,1138,26,3.5],["University of St Thomas",1,1090,21,3.5],["Sam Houston State University",0,1041,20,3.2],["St. Mary's University",1,1089,20,3.4],["Southern Methodist University",1,1428,32,3.8],["Nelson University",1,980,0,3.0],["Southwestern University",1,1241,29,3.7],["Stephen F Austin State University",0,1066,21,3.2],["Texas State University",0,1103,22,3.5],["Southwestern Adventist University",1,1031,19,3.2],["Sul Ross State University",0,1024,21,3.0],["Tarleton State University",0,1075,21,3.2],["Texas A&M University-Kingsville",0,1050,0,3.0],["Texas A&M University-College Station",0,1280,28,3.7],["The University of Texas at Arlington",0,1124,23,3.5],["The University of Texas at Austin",0,1395,31,3.9],["The University of Texas at Dallas",0,1286,28,3.8],["The University of Texas at El Paso",0,962,19,3.1],["The University of Texas at Tyler",0,1114,23,3.4],["Texas Christian University",1,1298,29,3.8],["The University of Texas Permian Basin",0,1033,22,3.0],["The University of Texas at San Antonio",0,1105,23,3.3],["Texas Southern University",0,914,17,3.0],["Texas Tech University",0,1190,25,3.5],["Texas Wesleyan University",1,1070,0,3.1],["Trinity University",1,1416,32,3.8],["West Texas A & M University",0,1050,20,3.2],["Brigham Young University",1,1376,30,3.9],["Brigham Young University-Hawaii",1,1130,23,3.5],["Utah State University",0,1187,24,3.4],["University of Utah",0,1257,26,3.6],["Westminster University",1,1220,25,3.4],["Bennington College",1,1364,32,3.6],["Champlain College",1,1312,28,3.3],["Middlebury College",1,1508,34,3.97],["Norwich University",1,1190,0,3.3],["Saint Michael's College",1,1245,28,3.5],["University of Vermont",0,1374,31,3.7],["Averett University",1,1135,26,3.0],["Bridgewater College",1,1180,0,3.3],["William & Mary",0,1473,33,3.9],["Regent University",1,1153,25,3.1],["Christopher Newport University",0,1180,27,3.8],["Emory & Henry University",1,1135,23,3.1],["George Mason University",0,1274,28,3.6],["Hampden-Sydney College",1,1207,26,3.4],["Hampton University",1,969,19,3.3],["Hollins University",1,1230,0,3.3],["James Madison University",0,1256,27,3.8],["Longwood University",0,1120,22,3.5],["University of Lynchburg",1,1125,0,3.2],["University of Mary Washington",0,1272,29,3.7],["Norfolk State University",0,927,19,3.0],["Old Dominion University",0,1197,26,3.4],["Radford University",0,1060,22,3.2],["Randolph-Macon College",1,1095,26,3.4],["Randolph College",1,1134,22,3.5],["University of Richmond",1,1497,34,3.8],["Roanoke College",1,1211,27,3.5],["Sweet Briar College",1,1230,0,3.3],["University of Virginia's College at Wise",0,1050,20,3.0],["Virginia Polytechnic Institute and State University",0,1364,30,3.9],["Virginia Commonwealth University",0,1137,25,3.5],["University of Virginia-Main Campus",0,1480,33,3.97],["Virginia Military Institute",0,1244,28,3.6],["Virginia State University",0,948,18,2.9],["Virginia Union University",1,850,0,2.8],["Washington and Lee University",1,1498,34,3.9],["The Evergreen State College",0,1216,26,3.0],["Gonzaga University",1,1335,29,3.7],["Northwest University",1,1150,0,3.4],["Pacific Lutheran University",1,1168,25,3.6],["University of Puget Sound",1,1296,29,3.7],["Saint Martin's University",1,1093,19,3.3],["Seattle University",1,1307,27,3.6],["Western Washington University",0,1289,28,3.4],["Whitman College",1,1410,31,3.8],["Whitworth University",1,1220,25,3.6],["Appalachian Bible College",1,1039,21,3.0],["Bluefield State University",0,989,20,3.0],["Concord University",0,977,20,3.0],["Fairmont State University",0,996,20,3.0],["Marshall University",0,1061,21,3.2],["Shepherd University",0,1034,21,3.2],["West Virginia State University",0,955,18,3.0],["West Liberty University",0,1045,22,3.1],["West Virginia University Institute of Technology",0,1033,21,3.1],["West Virginia Wesleyan College",1,1052,21,3.1],["West Virginia University",0,1122,23,3.5],["Beloit College",1,1287,26,3.5],["Carroll University",1,1190,24,3.4],["Carthage College",1,1150,23,3.4],["Concordia University-Wisconsin",1,1190,24,3.2],["Lawrence University",1,1350,29,3.7],["Maranatha Baptist University",1,1170,24,3.1],["Marquette University",1,1310,28,3.8],["Mount Mary University",1,1020,19,3.0],["Northland College",1,1104,22,3.1],["Ripon College",1,1176,24,3.4],["Saint Norbert College",1,1182,24,3.6],["Viterbo University",1,1190,24,3.2],["University of Wisconsin-Whitewater",0,1050,20,3.2],["University of Wisconsin-Eau Claire",0,1220,25,3.4],["University of Wisconsin-Green Bay",0,1120,22,3.3],["University of Wisconsin-La Crosse",0,1220,25,3.5],["Wisconsin Lutheran College",1,1239,26,3.4],["University of Wisconsin-Oshkosh",0,1090,21,3.2],["University of Wisconsin-Parkside",0,1090,21,3.0],["University of Wisconsin-Stout",0,1150,23,3.2],["University of Wisconsin-Superior",0,1090,21,3.0],["University of Wisconsin-Madison",0,1427,31,3.8],["University of Wisconsin-Milwaukee",0,1090,21,3.2],["University of Wisconsin-Platteville",0,1190,24,3.3],["University of Wisconsin-River Falls",0,1150,23,3.3],["University of Wisconsin-Stevens Point",0,1150,23,3.2],["Pontifical Catholic University of Puerto Rico-Ponce",1,1300,0,3.2],["University of Puerto Rico-Aguadilla",0,909,0,3.0],["University of Puerto Rico-Carolina",0,932,0,3.0],["University of Puerto Rico at Cayey",0,955,0,3.1],["University of the Virgin Islands",0,938,21,2.9],["Stanford University",1,1553,35,3.96],["Purdue University-Main Campus",0,1364,31,3.6],["Georgia State University-Perimeter College",0,919,18,3.0],["St. John's College",1,1426,32,3.8],["Mid-America Christian University",1,1020,19,3.1],["New College of Florida",0,1150,23,3.9],["Commonwealth Institute of Funeral Service",1,1110,0,3.0],["Soka University of America",1,1440,0,3.8],["Southeast Missouri Hospital College of Nursing and Health Sciences",1,1020,19,3.2],["Embry-Riddle Aeronautical University-Worldwide",1,1148,25,3.3],["Carolinas College of Health Sciences",0,1130,0,3.3],["Florida Gulf Coast University",0,1114,22,3.6],["University of Connecticut-Waterbury Campus",0,1060,0,3.2],["University of Connecticut-Avery Point",0,1090,0,3.2],["University of Connecticut-Stamford",0,1094,29,3.3],["New Saint Andrews College",1,1262,26,3.6],["Oregon State University-Cascades Campus",0,1255,0,3.4],["Franklin W Olin College of Engineering",1,1520,0,3.9],["DigiPen Institute of Technology",1,1297,28,3.5],["Central Methodist University-College of Graduate and Extended Studies",1,1120,22,3.0],["Neumont College of Computer Science",1,1093,23,3.2],["Johnson & Wales University-Charlotte",1,1007,19,3.0],["Visible Music College",1,1050,20,3.0],["Patrick Henry College",1,1352,30,3.7],["Jersey College",1,1058,21,3.0],["University of Minnesota-Rochester",0,1183,24,3.6],["Texas A&M University-San Antonio",0,955,18,3.2],["John Paul the Great Catholic University",1,1130,25,3.3],["University of Connecticut-Hartford Campus",0,1073,23,3.2],["Ottawa University-Surprise",1,972,18,3.0],["Evangel University-James River Assembly of God Church",1,720,0,3.4],["Pennsylvania State University-World Campus",0,1248,29,3.2],["Augusta University",0,1070,22,3.5],["Middle Georgia State University",0,1083,21,3.1],["DeVry University-Illinois",1,868,15,2.8],["University of North Georgia",0,1106,22,3.5],["Florida Polytechnic University",0,1268,27,3.7],["University of Florida-Online",0,1338,29,3.7],["University of North Texas at Dallas",0,940,0,3.2],["American College of the Building Arts",1,1190,24,3.0],["Kennesaw State University",0,1113,22,3.5],["Milligan University",1,1189,24,3.6],["Emory University-Oxford College",1,1520,34,3.7],["Husson University",1,1180,0,3.0],["Purdue University Northwest",0,1024,22,3.2],["Sattler College",1,1190,0,3.2],["Urshan University",1,988,19,3.0],["Commonwealth University of Pennsylvania",0,1090,0,3.1],["Pennsylvania Western University",0,1063,21,3.1]];
const C=R.map(([n,p,s,a,g])=>({name:n,priv:p,sat:s,act:a||null,gpa:g}));

// ═══════════ DOMAIN MAPPING ═══════════
const SD={
"Harvard University":"harvard.edu","Yale University":"yale.edu","Princeton University":"princeton.edu",
"Stanford University":"stanford.edu","Columbia University in the City of New York":"columbia.edu",
"Massachusetts Institute of Technology":"mit.edu","University of Pennsylvania":"upenn.edu",
"Brown University":"brown.edu","Dartmouth College":"dartmouth.edu","Cornell University":"cornell.edu",
"Duke University":"duke.edu","Rice University":"rice.edu","Vanderbilt University":"vanderbilt.edu",
"University of Notre Dame":"nd.edu","Northwestern University":"northwestern.edu",
"Washington University in St Louis":"wustl.edu","Emory University":"emory.edu",
"Georgetown University":"georgetown.edu","University of Michigan-Ann Arbor":"umich.edu",
"University of Virginia-Main Campus":"virginia.edu","Carnegie Mellon University":"cmu.edu",
"New York University":"nyu.edu","University of Southern California":"usc.edu",
"Boston College":"bc.edu","Boston University":"bu.edu","Tufts University":"tufts.edu",
"University of Florida":"ufl.edu","University of Georgia":"uga.edu",
"University of North Carolina at Chapel Hill":"unc.edu","The Ohio State University":"osu.edu",
"Pennsylvania State University-Main Campus":"psu.edu","University of Wisconsin-Madison":"wisc.edu",
"University of Illinois Urbana-Champaign":"illinois.edu","Purdue University-Main Campus":"purdue.edu",
"Texas A & M University-College Station":"tamu.edu","University of Washington-Seattle Campus":"uw.edu",
"University of Colorado Boulder":"colorado.edu","University of Maryland-College Park":"umd.edu",
"Virginia Polytechnic Institute and State University":"vt.edu",
"North Carolina State University at Raleigh":"ncsu.edu","University of Minnesota-Twin Cities":"umn.edu",
"Indiana University-Bloomington":"indiana.edu","Michigan State University":"msu.edu",
"University of Iowa":"uiowa.edu","Iowa State University":"iastate.edu",
"Oregon State University":"oregonstate.edu","Washington State University":"wsu.edu",
"University of Oregon":"uoregon.edu","University of Arizona":"arizona.edu",
"The University of Alabama":"ua.edu","Auburn University":"auburn.edu","Clemson University":"clemson.edu",
"Florida State University":"fsu.edu","University of Central Florida":"ucf.edu",
"University of Miami":"miami.edu","University of Connecticut":"uconn.edu",
"University of Massachusetts-Amherst":"umass.edu","Rutgers University-New Brunswick":"rutgers.edu",
"Stony Brook University":"stonybrook.edu","Binghamton University":"binghamton.edu",
"Syracuse University":"syracuse.edu","Rensselaer Polytechnic Institute":"rpi.edu",
"University of Rochester":"rochester.edu","George Washington University":"gwu.edu",
"American University":"american.edu","Northeastern University":"northeastern.edu",
"Brandeis University":"brandeis.edu","Wake Forest University":"wfu.edu",
"Lehigh University":"lehigh.edu","Villanova University":"villanova.edu",
"University of Richmond":"richmond.edu","Tulane University of Louisiana":"tulane.edu",
"Southern Methodist University":"smu.edu","Baylor University":"baylor.edu",
"Johns Hopkins University":"jhu.edu","University of Chicago":"uchicago.edu",
"Case Western Reserve University":"case.edu","Miami University-Oxford":"miamioh.edu",
"University of Pittsburgh-Pittsburgh Campus":"pitt.edu","University of Delaware":"udel.edu",
"University of Vermont":"uvm.edu","Amherst College":"amherst.edu","Williams College":"williams.edu",
"Bowdoin College":"bowdoin.edu","Colby College":"colby.edu","Bates College":"bates.edu",
"Middlebury College":"middlebury.edu","Swarthmore College":"swarthmore.edu",
"Haverford College":"haverford.edu","Pomona College":"pomona.edu",
"Claremont McKenna College":"cmc.edu","Harvey Mudd College":"hmc.edu",
"Wellesley College":"wellesley.edu","Smith College":"smith.edu","Barnard College":"barnard.edu",
"Colgate University":"colgate.edu","Hamilton College":"hamilton.edu",
"Wesleyan University":"wesleyan.edu","Vassar College":"vassar.edu",
"Grinnell College":"grinnell.edu","Carleton College":"carleton.edu",
"Macalester College":"macalester.edu","Oberlin College":"oberlin.edu",
"Kenyon College":"kenyon.edu","Davidson College":"davidson.edu",
"Colorado College":"coloradocollege.edu","Colorado School of Mines":"mines.edu",
"University of Denver":"du.edu","Reed College":"reed.edu","Gonzaga University":"gonzaga.edu",
"Santa Clara University":"scu.edu","Loyola Marymount University":"lmu.edu",
"Pepperdine University":"pepperdine.edu","Chapman University":"chapman.edu",
"Howard University":"howard.edu","Spelman College":"spelman.edu",
"New Jersey Institute of Technology":"njit.edu","Stevens Institute of Technology":"stevens.edu",
"Drexel University":"drexel.edu","Temple University":"temple.edu",
"Fordham University":"fordham.edu","Loyola University Chicago":"luc.edu",
"DePaul University":"depaul.edu","Marquette University":"marquette.edu",
"Creighton University":"creighton.edu","Saint Louis University":"slu.edu",
"Clark University":"clarku.edu","Connecticut College":"conncoll.edu",
"Trinity College":"trincoll.edu","The College of New Jersey":"tcnj.edu",
"Bucknell University":"bucknell.edu","Dickinson College":"dickinson.edu",
"Gettysburg College":"gettysburg.edu","Franklin & Marshall College":"fandm.edu",
"Lafayette College":"lafayette.edu","Centre College":"centre.edu",
"Whitman College":"whitman.edu","Occidental College":"oxy.edu",
"Sewanee-The University of the South":"sewanee.edu","Rhodes College":"rhodes.edu",
"University of Puget Sound":"pugetsound.edu","Lewis & Clark College":"lclark.edu",
"Georgia Institute of Technology-Main Campus":"gatech.edu",
"Rochester Institute of Technology":"rit.edu","Illinois Institute of Technology":"iit.edu",
"University of Kentucky":"uky.edu","University of Louisville":"louisville.edu",
"The University of Tennessee-Knoxville":"utk.edu",
"Louisiana State University and Agricultural & Mechanical College":"lsu.edu",
"University of Arkansas":"uark.edu","University of Oklahoma Norman Campus":"ou.edu",
"Oklahoma State University-Main Campus":"okstate.edu","University of Kansas":"ku.edu",
"Kansas State University":"ksu.edu","University of Nebraska-Lincoln":"unl.edu",
"University of Missouri-Columbia":"missouri.edu","University of Mississippi":"olemiss.edu",
"Mississippi State University":"msstate.edu","Brigham Young University":"byu.edu",
"University of Utah":"utah.edu","Utah State University":"usu.edu",
"University of Nevada-Reno":"unr.edu","University of Nevada-Las Vegas":"unlv.edu",
"University of Hawaii at Manoa":"hawaii.edu","University of New Mexico-Main Campus":"unm.edu",
"University of Wyoming":"uwyo.edu","Montana State University":"montana.edu",
"North Dakota State University-Main Campus":"ndsu.edu",
"South Dakota State University":"sdstate.edu","University of South Dakota":"usd.edu",
"Texas Tech University":"ttu.edu","University of Houston":"uh.edu",
"Texas Christian University":"tcu.edu","Texas State University":"txstate.edu",
"The University of Texas at Austin":"utexas.edu","The University of Texas at Dallas":"utdallas.edu",
"The University of Texas at San Antonio":"utsa.edu",
"Emerson College":"emerson.edu","Babson College":"babson.edu","Bentley University":"bentley.edu",
"DePauw University":"depauw.edu","Butler University":"butler.edu",
"Hope College":"hope.edu","Calvin University":"calvin.edu","Kalamazoo College":"kzoo.edu",
"Hillsdale College":"hillsdale.edu","Drake University":"drake.edu",
"Truman State University":"truman.edu","Berea College":"berea.edu",
"Hendrix College":"hendrix.edu","Wheaton College":"wheaton.edu","Knox College":"knox.edu",
"Wabash College":"wabash.edu","Earlham College":"earlham.edu",
"George Mason University":"gmu.edu","James Madison University":"jmu.edu",
"Washington and Lee University":"wlu.edu","Virginia Military Institute":"vmi.edu",
"Franklin W Olin College of Engineering":"olin.edu",
"Muhlenberg College":"muhlenberg.edu","Ursinus College":"ursinus.edu",
"Providence College":"providence.edu","Bryant University":"bryant.edu",
"Webb Institute":"webb.edu","Skidmore College":"skidmore.edu","Bard College":"bard.edu",
"Ithaca College":"ithaca.edu","Hofstra University":"hofstra.edu",
"Elon University":"elon.edu","Appalachian State University":"appstate.edu",
"Kennesaw State University":"kennesaw.edu","Savannah College of Art and Design":"scad.edu",
"Belmont University":"belmont.edu","Furman University":"furman.edu",
"Wofford College":"wofford.edu","Rollins College":"rollins.edu",
"Stetson University":"stetson.edu","University of South Florida":"usf.edu",
"Florida International University":"fiu.edu","University of South Carolina-Columbia":"sc.edu",
"College of Charleston":"charleston.edu","Coastal Carolina University":"coastal.edu",
"University of North Carolina Wilmington":"uncw.edu","East Carolina University":"ecu.edu",
"University of Memphis":"memphis.edu","Middle Tennessee State University":"mtsu.edu",
"Georgia Southern University":"georgiasouthern.edu","Georgia State University":"gsu.edu",
"University of North Georgia":"ung.edu","Mercer University":"mercer.edu",
"Berry College":"berry.edu","Agnes Scott College":"agnesscott.edu",
"University of Alabama at Birmingham":"uab.edu","Samford University":"samford.edu",
"Liberty University":"liberty.edu","Old Dominion University":"odu.edu",
"Christopher Newport University":"cnu.edu","University of Mary Washington":"umw.edu",
"University of Scranton":"scranton.edu","Duquesne University":"duq.edu",
"Missouri University of Science and Technology":"mst.edu",
"University of Tulsa":"utulsa.edu","Willamette University":"willamette.edu",
"Portland State University":"pdx.edu","Pacific Lutheran University":"plu.edu",
"Whitworth University":"whitworth.edu","Saint Olaf College":"stolaf.edu",
"St Olaf College":"stolaf.edu","Gustavus Adolphus College":"gustavus.edu",
"University of St. Thomas":"stthomas.edu","Luther College":"luther.edu",
"Augustana University":"augie.edu","Doane University":"doane.edu",
"Concordia College at Moorhead":"concordiacollege.edu",
"Oral Roberts University":"oru.edu","Harding University":"harding.edu",
"Abilene Christian University":"acu.edu","Trinity University":"trinity.edu",
"Southwestern University":"southwestern.edu","LeTourneau University":"letu.edu",
"Pratt Institute-Main":"pratt.edu","Cooper Union for the Advancement of Science and Art":"cooper.edu",
"The Cooper Union for the Advancement of Science and Art":"cooper.edu",
"United States Military Academy":"westpoint.edu","United States Naval Academy":"usna.edu",
"United States Air Force Academy":"usafa.edu","New College of Florida":"ncf.edu",
"Florida Polytechnic University":"floridapoly.edu","Florida Gulf Coast University":"fgcu.edu",
"Embry-Riddle Aeronautical University-Daytona Beach":"erau.edu",
"University of North Carolina at Charlotte":"charlotte.edu",
"University of North Carolina at Greensboro":"uncg.edu",
"Western Carolina University":"wcu.edu",
"University of Cincinnati-Main Campus":"uc.edu","University of Dayton":"udayton.edu",
"Denison University":"denison.edu",
};
function gD(n){if(SD[n])return SD[n];let s=n.toLowerCase().replace(/-main campus|-worldwide.*/,"").replace(/^the /,"").trim();let m;
if((m=s.match(/^(.+?) state (university|college)/)))return m[1].replace(/[^a-z]/g,"")+"state.edu";
if((m=s.match(/university of (.+)/)))return m[1].replace(/[^a-z ]/g,"").replace(/ /g,"")+".edu";
if((m=s.match(/(.+?) university/)))return m[1].replace(/[^a-z]/g,"")+".edu";
if((m=s.match(/(.+?) college/)))return m[1].replace(/[^a-z]/g,"")+".edu";
return s.replace(/[^a-z]/g,"")+".edu";}

// ═══════════ SCORING ENGINE ═══════════
const ACT_SAT={36:1600,35:1590,34:1540,33:1500,32:1470,31:1440,30:1410,29:1380,28:1360,27:1330,26:1300,25:1260,24:1230,23:1200,22:1160,21:1130,20:1090,19:1050,18:1020,17:990,16:950,15:910,14:880,13:830,12:780};
function actToSat(a){return ACT_SAT[Math.max(12,Math.min(36,Math.round(a)))]||780}

// AP Course difficulty tiers
const AP_DIFFICULTY={
  "AP Physics C: Mechanics":12,"AP Physics C: Electricity and Magnetism":12,"AP Physics C":12,
  "AP Chemistry":11,"AP Calculus BC":11,"AP Biology":11,"AP Physics 1":10,"AP Physics 2":10,
  "AP Calculus AB":10,"AP US History":10,"AP World History":10,"AP European History":10,
  "AP English Literature":10,"AP Computer Science A":10,"AP Statistics":9,
  "AP English Language":9,"AP Microeconomics":9,"AP Macroeconomics":9,"AP Government":9,
  "AP Spanish Language":9,"AP French Language":9,"AP Chinese":9,"AP Latin":10,
  "AP Art History":8,"AP Music Theory":8,"AP Environmental Science":7,
  "AP Psychology":7,"AP Human Geography":7,"AP Computer Science Principles":7,
  "AP Seminar":7,"AP Research":8,"AP Studio Art":7
};
function getAPDifficulty(name){
  const n=name.trim();
  if(AP_DIFFICULTY[n])return AP_DIFFICULTY[n];
  const lower=n.toLowerCase();
  if(lower.includes("physics c"))return 12;
  if(lower.includes("calc")&&lower.includes("bc"))return 11;
  if(lower.includes("chem")&&lower.includes("ap"))return 11;
  if(lower.includes("bio")&&lower.includes("ap"))return 11;
  if(lower.includes("calc")&&lower.includes("ab"))return 10;
  if(lower.includes("physics"))return 10;
  if(lower.includes("history"))return 10;
  if(lower.includes("computer science a"))return 10;
  if(lower.includes("english lit"))return 10;
  if(lower.includes("stat"))return 9;
  if(lower.includes("english lang"))return 9;
  if(lower.includes("econ"))return 9;
  if(lower.includes("psych"))return 7;
  if(lower.includes("environ"))return 7;
  if(lower.includes("human geo"))return 7;
  return 8;
}

function calcCourseRigor(courses){
  if(!courses.length)return 20;
  let total=0,maxTotal=0;
  courses.forEach(c=>{
    let diff=4;
    if(c.type==="AP"){diff=getAPDifficulty(c.name)}
    else if(c.type==="IB"){diff=10}
    else if(c.type==="Honors"){diff=7}
    else if(c.type==="DE"){diff=8}
    let gradeMult=1;
    if(c.grade==="A+"||c.grade==="A")gradeMult=1;
    else if(c.grade==="A-")gradeMult=0.95;
    else if(c.grade==="B+"||c.grade==="B")gradeMult=0.82;
    else if(c.grade==="B-")gradeMult=0.75;
    else if(c.grade==="C+"||c.grade==="C")gradeMult=0.6;
    else gradeMult=0.4;
    let pts=diff*gradeMult;
    if(c.apScore>=5)pts+=2.5;
    else if(c.apScore>=4)pts+=1.5;
    else if(c.apScore>=3)pts+=0.5;
    total+=pts;
    maxTotal+=12+2.5;
  });
  return Math.min(100,Math.round((total/maxTotal)*110));
}

// ── Local essay grading fallback (always works, any format) ──
function localEssayGrade(text){
  const clean=text.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
  const words=clean.split(/\s+/);
  const wc=words.length;
  const sentences=clean.split(/[.!?]+/).filter(s=>s.trim().length>3);
  const paragraphs=clean.split(/\n\s*\n/).filter(p=>p.trim().length>10);
  const uniqueWords=new Set(words.map(w=>w.toLowerCase().replace(/[^a-z']/g,''))).size;
  const breakdown=[];
  let total=0;

  // 1. Theme/Focus (12 max) — proxy: consistent paragraph topics, not all over the place
  const themeScore=paragraphs.length>=2&&paragraphs.length<=8?Math.min(12,6+paragraphs.length):4;
  breakdown.push({criterion:"Clear focused theme",points:themeScore,maxPoints:12,note:paragraphs.length>=3?"Multiple paragraphs suggest organized thought":"Consider developing your theme across multiple paragraphs"});
  total+=themeScore;

  // 2. Personal voice (10) — first-person usage
  const fp=(clean.match(/\bI\b|\bmy\b|\bme\b|\bmyself\b/gi)||[]).length;
  const voiceScore=fp>=8?10:fp>=4?7:fp>=1?5:2;
  breakdown.push({criterion:"Personal voice",points:voiceScore,maxPoints:10,note:fp>=4?"Strong first-person perspective":"Use more personal, first-person language"});
  total+=voiceScore;

  // 3. Specific examples (10) — numbers, names, quotes, dates
  const specifics=(clean.match(/\d{2,}|"[^"]{3,}"|[A-Z][a-z]+\s[A-Z][a-z]+/g)||[]).length;
  const specScore=specifics>=6?10:specifics>=3?7:specifics>=1?5:2;
  breakdown.push({criterion:"Specific examples",points:specScore,maxPoints:10,note:specifics>=3?"Good use of concrete details":"Add more specific names, numbers, and examples"});
  total+=specScore;

  // 4. Reflection/growth (10) — growth/learning keywords
  const reflectWords=(clean.match(/\b(learned|realized|understood|changed|grew|discovered|transformed|challenged|overcame|perspective|insight|growth|shaped|inspired|motivated)\b/gi)||[]).length;
  const reflScore=reflectWords>=4?10:reflectWords>=2?7:reflectWords>=1?5:2;
  breakdown.push({criterion:"Honest reflection",points:reflScore,maxPoints:10,note:reflectWords>=2?"Shows personal growth":"Add more reflection on what you learned or how you changed"});
  total+=reflScore;

  // 5. Opening (8) — first sentence quality
  const firstSent=(sentences[0]||"").trim();
  const openScore=(firstSent.length>15&&!firstSent.match(/^(I am|My name|In this|This essay|I want|I have always)/i))?8:firstSent.length>10?5:3;
  breakdown.push({criterion:"Strong opening",points:openScore,maxPoints:8,note:openScore>=6?"Engaging opening":"Avoid generic openings — start with a specific moment or image"});
  total+=openScore;

  // 6. Organization (8) — paragraph count and sentence variety
  const orgScore=paragraphs.length>=3&&sentences.length>=8?8:paragraphs.length>=2?5:3;
  breakdown.push({criterion:"Organization",points:orgScore,maxPoints:8,note:orgScore>=6?"Well-structured":"Break your essay into clearer sections with transitions"});
  total+=orgScore;

  // 7. Values connection (8)
  const valueWords=(clean.match(/\b(value|believe|care|passion|commitment|purpose|meaning|community|impact|contribute|serve)\b/gi)||[]).length;
  const valScore=valueWords>=3?8:valueWords>=1?5:3;
  breakdown.push({criterion:"Values connection",points:valScore,maxPoints:8,note:valueWords>=2?"Clear connection to personal values":"Connect your story to what you value and care about"});
  total+=valScore;

  // 8. Conciseness (7)
  const avgSentLen=wc/(sentences.length||1);
  const conciseScore=(avgSentLen>=12&&avgSentLen<=25&&wc>=250&&wc<=700)?7:(wc>=200&&wc<=900)?5:3;
  breakdown.push({criterion:"Concise writing",points:conciseScore,maxPoints:7,note:wc>=400&&wc<=650?"Good length":"Aim for 500-650 words with varied sentence lengths"});
  total+=conciseScore;

  // 9. Grammar/clarity (7) — rough: capitalization, no excessive repetition
  const capStarts=sentences.filter(s=>/^\s*[A-Z]/.test(s)).length/(sentences.length||1);
  const gramScore=capStarts>0.85?7:capStarts>0.6?5:3;
  breakdown.push({criterion:"Grammar and clarity",points:gramScore,maxPoints:7,note:gramScore>=6?"Generally clean writing":"Review for grammar and sentence clarity"});
  total+=gramScore;

  // 10. Originality (10) — vocabulary diversity as proxy
  const diversity=uniqueWords/(wc||1);
  const origScore=diversity>0.55?10:diversity>0.4?7:diversity>0.3?5:3;
  breakdown.push({criterion:"Originality",points:origScore,maxPoints:10,note:diversity>0.45?"Rich vocabulary suggests original thinking":"Vary your word choice to stand out"});
  total+=origScore;

  // 11. Character evidence (10) — action words suggesting initiative
  const charWords=(clean.match(/\b(led|created|built|founded|organized|initiated|volunteered|mentored|designed|launched|researched|advocated)\b/gi)||[]).length;
  const charScore=charWords>=4?10:charWords>=2?7:charWords>=1?5:3;
  breakdown.push({criterion:"Character evidence",points:charScore,maxPoints:10,note:charWords>=2?"Shows initiative and action":"Include examples that demonstrate your character through actions"});
  total+=charScore;

  const strengths=breakdown.filter(b=>b.points>=b.maxPoints*0.7).slice(0,3).map(b=>b.criterion+": "+b.note);
  const improvements=breakdown.filter(b=>b.points<b.maxPoints*0.6).slice(0,3).map(b=>b.note);
  if(!strengths.length)strengths.push("Essay was submitted for review");
  if(!improvements.length)improvements.push("Consider adding more specific details and personal reflection");

  const overallFeedback=total>=80?"This is a strong essay with clear voice and specific details. Focus on polishing transitions and ensuring your conclusion ties back to your opening.":
    total>=60?"Your essay shows promise but needs more specific examples and deeper reflection. Avoid vague claims — show, don't tell.":
    total>=40?"The essay needs significant revision. Focus on a single clear theme, add concrete personal stories, and reflect on what you learned.":
    "Consider rewriting with a specific personal story as the backbone. Admissions readers want to hear YOUR unique voice with real details.";

  return{score:total,breakdown,strengths,improvements,overallFeedback};
}

// ── LOR score from self-assessment questions ──
function calcLorScore(lor){
  if(!lor)return 50;
  let score=30;
  // Relationship closeness
  if(lor.closeness==='very')score+=20;
  else if(lor.closeness==='moderate')score+=12;
  else score+=5;
  // Teacher type
  if(lor.teacherType==='core')score+=15;
  else if(lor.teacherType==='elective')score+=10;
  else score+=5;
  // Class performance
  if(lor.performance==='top')score+=20;
  else if(lor.performance==='strong')score+=12;
  else score+=5;
  // Extra engagement
  if(lor.extra)score+=10;
  return Math.min(100,score);
}

function scoreProfile(uSAT,uGPA,ecTier,courseRigor,essayScore,factors,school,testOptional,lorScore){
  const s=school.sat;
  const privBoost=school.priv?0.02:0;
  let wAcad,wEC,wEssay,wSoft,wCourse,wLor;

  if(testOptional){
    // Test-optional: redistribute SAT weight to other factors
    // More selective schools penalize test-optional more
    const penalty=s>=1400?0.06:s>=1200?0.03:0;
    if(s>=1500){wAcad=.14;wEC=.27;wEssay=.24+privBoost;wSoft=.14;wCourse=.15;wLor=.06}
    else if(s>=1400){wAcad=.18;wEC=.25;wEssay=.22;wSoft=.14;wCourse=.14;wLor=.07}
    else if(s>=1300){wAcad=.22;wEC=.22;wEssay=.19;wSoft=.14;wCourse=.15;wLor=.08}
    else if(s>=1200){wAcad=.28;wEC=.20;wEssay=.16;wSoft=.13;wCourse=.15;wLor=.08}
    else{wAcad=.35;wEC=.18;wEssay=.13;wSoft=.12;wCourse=.14;wLor=.08}
  } else {
    if(s>=1500){wAcad=.22;wEC=.25-privBoost;wEssay=.22+privBoost;wSoft=.13;wCourse=.13;wLor=.05}
    else if(s>=1400){wAcad=.28;wEC=.23;wEssay=.19;wSoft=.12;wCourse=.13;wLor=.05}
    else if(s>=1300){wAcad=.35;wEC=.20;wEssay=.16;wSoft=.11;wCourse=.13;wLor=.05}
    else if(s>=1200){wAcad=.42;wEC=.18;wEssay=.13;wSoft=.10;wCourse=.12;wLor=.05}
    else if(s>=1100){wAcad=.48;wEC=.16;wEssay=.11;wSoft=.09;wCourse=.11;wLor=.05}
    else{wAcad=.55;wEC=.13;wEssay=.08;wSoft=.08;wCourse=.11;wLor=.05}
  }

  // GPA sub-score
  const gpaDelta=uGPA-school.gpa;
  const gpaRaw=Math.max(0,Math.min(100,55+(gpaDelta/0.1)*12));

  let acadScore;
  if(testOptional){
    acadScore=gpaRaw;
  }else{
    const satDelta=uSAT-school.sat;
    const satRaw=Math.max(0,Math.min(100,55+(satDelta/50)*10));
    acadScore=gpaRaw*0.55+satRaw*0.45;
  }

  const ecScore=({1:95,2:78,3:58,4:38,5:8})[ecTier]||8;
  const courseScore=Math.min(100,courseRigor);
  const essScore=essayScore;
  const lorPts=lorScore||50;

  let soft=30;
  if(factors.legacy)soft+=18;
  if(factors.firstGen)soft+=10;
  if(factors.athlete)soft+=22;
  if(factors.urm)soft+=10;
  if(factors.international)soft-=6;
  if(factors.demonstratedInterest)soft+=8;
  if(factors.earlyDecision)soft+=7;
  soft=Math.min(100,Math.max(0,soft));

  const total=acadScore*wAcad+ecScore*wEC+essScore*wEssay+soft*wSoft+courseScore*wCourse+lorPts*wLor;
  return{total:Math.max(0,Math.min(100,total)),acadScore,ecScore,courseScore,essScore,softScore:soft,lorScore:lorPts,
    weights:{wAcad,wEC,wEssay,wSoft,wCourse,wLor},testOptional};
}

function computeChance(score,avgSAT){
  const pairs=[[1550,.04],[1500,.07],[1450,.13],[1400,.20],[1350,.30],
    [1300,.40],[1250,.50],[1200,.60],[1150,.68],[1100,.76],
    [1050,.82],[1000,.87],[950,.91],[900,.94],[0,.96]];
  let base=.96;
  for(const[s,r]of pairs){if(avgSAT>=s){base=r;break}}
  const selectivity=1-base;
  const ceiling=Math.min(0.95,0.40+(1-selectivity)*0.58);
  const floor=Math.max(0.01,base*0.12);
  const exponent=0.85+selectivity*0.45;
  const normalized=Math.max(0,Math.min(1,score/100));
  const curved=Math.pow(normalized,exponent);
  const chance=floor+(ceiling-floor)*curved;
  return Math.max(1,Math.min(95,Math.round(chance*100)));
}

function getCat(ch){
  if(ch>=60)return{l:"Safety",c:"#10b981",bg:"#ecfdf5"};
  if(ch>=30)return{l:"Target",c:"#3b82f6",bg:"#eff6ff"};
  if(ch>=12)return{l:"Reach",c:"#f59e0b",bg:"#fffbeb"};
  return{l:"Hard Reach",c:"#ef4444",bg:"#fef2f2"};
}


// ═══════════ MAJOR SELECTION SYSTEM ═══════════
var MAJORS=[
// [name, category, baseMultiplier]  mult < 1 = harder than avg, > 1 = easier
["Computer Science","STEM",0.62],["Data Science","STEM",0.68],["Artificial Intelligence","STEM",0.60],
["Computer Engineering","Engineering",0.63],["Electrical Engineering","Engineering",0.65],
["Mechanical Engineering","Engineering",0.67],["Chemical Engineering","Engineering",0.68],
["Biomedical Engineering","Engineering",0.65],["Civil Engineering","Engineering",0.72],
["Aerospace Engineering","Engineering",0.66],["Industrial Engineering","Engineering",0.72],
["Environmental Engineering","Engineering",0.78],["Materials Science","Engineering",0.78],
["Software Engineering","Engineering",0.63],
["Biology","Science",0.85],["Chemistry","Science",0.88],["Physics","Science",0.85],
["Mathematics","Science",0.82],["Statistics","Science",0.80],["Neuroscience","Science",0.78],
["Environmental Science","Science",0.92],["Biochemistry","Science",0.82],
["Business Administration","Business",0.70],["Finance","Business",0.65],
["Accounting","Business",0.75],["Marketing","Business",0.80],["Economics","Business",0.78],
["Management","Business",0.80],["Entrepreneurship","Business",0.82],
["Information Systems","Business",0.72],["Supply Chain","Business",0.82],
["Nursing","Health",0.55],["Pre-Med Track","Health",0.72],["Public Health","Health",0.82],
["Kinesiology","Health",0.88],["Nutrition","Health",0.90],["Health Sciences","Health",0.85],
["Psychology","Social Sci",0.95],["Political Science","Social Sci",0.95],
["Sociology","Social Sci",1.0],["Anthropology","Social Sci",1.05],
["International Relations","Social Sci",0.88],["Criminal Justice","Social Sci",1.0],
["Social Work","Social Sci",1.02],
["English","Humanities",1.05],["History","Humanities",1.05],["Philosophy","Humanities",1.08],
["Religious Studies","Humanities",1.12],["Classics","Humanities",1.10],
["Linguistics","Humanities",1.02],["Comparative Literature","Humanities",1.08],
["Communications","Comm",0.85],["Journalism","Comm",0.88],["Public Relations","Comm",0.90],
["Film Studies","Arts",0.80],["Media Studies","Comm",0.92],
["Fine Arts","Arts",0.90],["Music","Arts",0.82],["Theater","Arts",0.88],
["Graphic Design","Arts",0.85],["Architecture","Arts",0.70],
["Education","Education",1.0],["Special Education","Education",1.05],
["Undecided","General",1.0],["Liberal Arts","General",1.05]
];

// School-specific program overrides: [schoolName]: {major: multiplier}
// Lower = harder to get into that specific program
var SCHOOL_MAJORS={
"Georgia Institute of Technology-Main Campus":{"Computer Science":0.45,"Computer Engineering":0.48,"Mechanical Engineering":0.58,"Electrical Engineering":0.55,"Biomedical Engineering":0.55,"Aerospace Engineering":0.55,"Industrial Engineering":0.60,"Business Administration":0.65},
"Carnegie Mellon University":{"Computer Science":0.40,"Artificial Intelligence":0.38,"Data Science":0.45,"Software Engineering":0.42,"Business Administration":0.60,"Fine Arts":0.55,"Architecture":0.52,"Music":0.55},
"University of Michigan-Ann Arbor":{"Computer Science":0.52,"Business Administration":0.42,"Finance":0.40,"Mechanical Engineering":0.58,"Electrical Engineering":0.55,"Nursing":0.40,"Economics":0.68},
"University of Virginia-Main Campus":{"Business Administration":0.38,"Finance":0.35,"Commerce":0.35,"Computer Science":0.55,"Nursing":0.42,"Economics":0.70},
"University of California-Berkeley":{"Computer Science":0.35,"Electrical Engineering":0.38,"Data Science":0.42,"Business Administration":0.40,"Mechanical Engineering":0.50,"Chemical Engineering":0.55,"Biomedical Engineering":0.50},
"Massachusetts Institute of Technology":{"Computer Science":0.55,"Electrical Engineering":0.58,"Mechanical Engineering":0.60,"Aerospace Engineering":0.58,"Physics":0.60,"Mathematics":0.58,"Biology":0.62},
"Stanford University":{"Computer Science":0.50,"Electrical Engineering":0.52,"Management Science":0.48,"Human-Computer Interaction":0.50},
"Cornell University":{"Computer Science":0.48,"Business Administration":0.50,"Architecture":0.45,"Hotel Administration":0.55,"Biological Engineering":0.55},
"University of Pennsylvania":{"Business Administration":0.35,"Finance":0.32,"Nursing":0.38,"Computer Science":0.52,"Economics":0.55},
"Northwestern University":{"Journalism":0.50,"Communications":0.48,"Computer Science":0.55,"Economics":0.58,"Music":0.52},
"Rice University":{"Computer Science":0.52,"Engineering":0.55,"Architecture":0.50,"Business Administration":0.55},
"Duke University":{"Computer Science":0.55,"Public Policy":0.58,"Economics":0.60,"Biomedical Engineering":0.55,"Nursing":0.48},
"University of Southern California":{"Computer Science":0.45,"Film Studies":0.35,"Business Administration":0.50,"Engineering":0.55,"Communications":0.55},
"New York University":{"Business Administration":0.42,"Finance":0.40,"Film Studies":0.45,"Computer Science":0.52,"Nursing":0.48},
"Boston University":{"Business Administration":0.62,"Communications":0.60,"Computer Science":0.58,"Engineering":0.62,"Nursing":0.52},
"Northeastern University":{"Computer Science":0.50,"Engineering":0.55,"Business Administration":0.58,"Nursing":0.48},
"University of Washington-Seattle Campus":{"Computer Science":0.30,"Information Systems":0.42,"Engineering":0.50,"Business Administration":0.52,"Nursing":0.40},
"University of Illinois Urbana-Champaign":{"Computer Science":0.38,"Engineering":0.52,"Business Administration":0.55,"Accounting":0.50},
"Purdue University-Main Campus":{"Computer Science":0.48,"Engineering":0.55,"Nursing":0.50,"Business Administration":0.60},
"University of Texas at Austin":{"Computer Science":0.38,"Business Administration":0.35,"Engineering":0.50,"Nursing":0.42,"Communications":0.58},
"The University of Texas at Austin":{"Computer Science":0.38,"Business Administration":0.35,"Engineering":0.50,"Nursing":0.42},
"Texas A & M University-College Station":{"Engineering":0.55,"Computer Science":0.50,"Business Administration":0.60,"Nursing":0.50},
"University of Florida":{"Computer Science":0.50,"Engineering":0.55,"Business Administration":0.52,"Nursing":0.42},
"University of Georgia":{"Business Administration":0.55,"Computer Science":0.60,"Biology":0.72},
"Ohio State University-Main Campus":{"Computer Science":0.52,"Engineering":0.55,"Business Administration":0.50,"Nursing":0.45},
"The Ohio State University":{"Computer Science":0.52,"Engineering":0.55,"Business Administration":0.50,"Nursing":0.45},
"University of North Carolina at Chapel Hill":{"Business Administration":0.45,"Computer Science":0.52,"Nursing":0.40,"Communications":0.55},
"University of Wisconsin-Madison":{"Computer Science":0.48,"Engineering":0.52,"Business Administration":0.50,"Nursing":0.45},
"University of Maryland-College Park":{"Computer Science":0.45,"Engineering":0.52,"Business Administration":0.58},
"Virginia Polytechnic Institute and State University":{"Engineering":0.58,"Computer Science":0.52,"Architecture":0.55,"Business Administration":0.65},
"Pennsylvania State University-Main Campus":{"Engineering":0.58,"Computer Science":0.55,"Business Administration":0.60,"Nursing":0.48},
"University of Minnesota-Twin Cities":{"Computer Science":0.52,"Engineering":0.58,"Business Administration":0.55,"Nursing":0.50},
"North Carolina State University at Raleigh":{"Computer Science":0.48,"Engineering":0.55,"Business Administration":0.62},
"Clemson University":{"Engineering":0.62,"Computer Science":0.58,"Nursing":0.55,"Business Administration":0.68},
"University of Pittsburgh-Pittsburgh Campus":{"Nursing":0.42,"Computer Science":0.55,"Engineering":0.58,"Business Administration":0.62},
"Indiana University-Bloomington":{"Business Administration":0.45,"Finance":0.42,"Computer Science":0.62,"Music":0.55},
"Michigan State University":{"Computer Science":0.58,"Engineering":0.60,"Business Administration":0.62},
"University of Colorado Boulder":{"Computer Science":0.52,"Engineering":0.58,"Business Administration":0.62},
"University of Connecticut":{"Business Administration":0.55,"Engineering":0.58,"Nursing":0.45,"Computer Science":0.55},
"Florida State University":{"Business Administration":0.62,"Computer Science":0.58,"Nursing":0.50,"Film Studies":0.55},
"University of South Carolina-Columbia":{"Business Administration":0.58,"Nursing":0.48,"Engineering":0.62},
"Emory University":{"Business Administration":0.55,"Nursing":0.48,"Biology":0.62,"Computer Science":0.58},
"Georgetown University":{"International Relations":0.50,"Business Administration":0.48,"Foreign Service":0.45,"Computer Science":0.62},
"Wake Forest University":{"Business Administration":0.55,"Computer Science":0.62},
"Tulane University of Louisiana":{"Business Administration":0.58,"Architecture":0.55,"Public Health":0.60},
"Case Western Reserve University":{"Engineering":0.55,"Computer Science":0.52,"Nursing":0.48,"Business Administration":0.62},
"Lehigh University":{"Engineering":0.55,"Business Administration":0.52,"Computer Science":0.55},
"Villanova University":{"Business Administration":0.52,"Engineering":0.58,"Nursing":0.48},
"University of Richmond":{"Business Administration":0.55,"Economics":0.62},
"Southern Methodist University":{"Business Administration":0.52,"Engineering":0.58,"Computer Science":0.58},
"Baylor University":{"Business Administration":0.58,"Nursing":0.48,"Engineering":0.62,"Computer Science":0.60},
"Rensselaer Polytechnic Institute":{"Computer Science":0.52,"Engineering":0.55,"Architecture":0.55},
"Stevens Institute of Technology":{"Computer Science":0.52,"Engineering":0.55,"Business Administration":0.62,"Finance":0.58},
"Worcester Polytechnic Institute":{"Computer Science":0.55,"Engineering":0.58},
"Rose-Hulman Institute of Technology":{"Computer Science":0.55,"Engineering":0.58},
"University of Rochester":{"Computer Science":0.55,"Engineering":0.58,"Business Administration":0.58,"Music":0.52},
"Stony Brook University":{"Computer Science":0.48,"Engineering":0.55,"Nursing":0.45},
"Binghamton University":{"Computer Science":0.50,"Engineering":0.55,"Business Administration":0.52,"Nursing":0.48},
"University of Delaware":{"Engineering":0.58,"Business Administration":0.60,"Nursing":0.48,"Computer Science":0.55},
};

function getMajorsForSchool(school){
  // Return array of {name, category, multiplier} for this school
  var specific=SCHOOL_MAJORS[school.name]||{};
  var result=[];
  for(var i=0;i<MAJORS.length;i++){
    var m=MAJORS[i];
    var mult=specific[m[0]]||m[2];
    // Engineering/nursing schools that are known for those programs
    result.push({name:m[0],category:m[1],mult:mult,isSpecific:!!specific[m[0]]});
  }
  return result;
}

function adjustChanceForMajor(baseChance,majorMult,schoolSat){
  // More selective schools have bigger gaps between majors
  var selectivity=schoolSat>=1400?1.3:schoolSat>=1200?1.15:1.0;
  var adjusted=baseChance*Math.pow(majorMult,selectivity);
  return Math.max(1,Math.min(95,Math.round(adjusted)));
}

function getMajorExplanation(majorName,mult,isSpecific,schoolName){
  if(mult<=0.5)return majorName+" is an extremely competitive program"+(isSpecific?" at "+schoolName:"")+". Admission rates are well below the school average.";
  if(mult<=0.65)return majorName+" is a highly sought-after program"+(isSpecific?" at "+schoolName:"")+". Expect significantly lower admission odds.";
  if(mult<=0.80)return majorName+" is more competitive than the school average"+(isSpecific?" at "+schoolName:"")+".";
  if(mult>=1.05)return majorName+" is less competitive than the school average, which may improve your chances.";
  return "Admission to "+majorName+" is roughly in line with the school's overall rate.";
}

// ═══════════ AVATAR ═══════════
function hsh(s){let h=0;for(let i=0;i<s.length;i++)h=((h<<5)-h)+s.charCodeAt(i);return Math.abs(h)}
const GR=[["#667eea","#764ba2"],["#f093fb","#f5576c"],["#4facfe","#00f2fe"],["#43e97b","#38f9d7"],["#fa709a","#fee140"],["#a18cd1","#fbc2eb"],["#fccb90","#d57eeb"],["#e0c3fc","#8ec5fc"],["#f5576c","#ff6b6b"],["#667eea","#00d2ff"],["#11998e","#38ef7d"],["#FC5C7D","#6A82FB"],["#a1c4fd","#c2e9fb"],["#84fab0","#8fd3f4"],["#fbc2eb","#a6c1ee"],["#a6c0fe","#f68084"],["#0ba360","#3cba92"],["#00c6fb","#005bea"]];
function avStyle(n){const g=GR[hsh(n)%GR.length];return{background:"linear-gradient(135deg,"+g[0]+","+g[1]+")"}}
function initials(n){const w=n.replace(/University of |The |College of |State University/gi,'').trim().split(/\s+/);return w.length>=2?(w[0][0]+w[1][0]).toUpperCase():n.slice(0,2).toUpperCase()}

// ═══════════ API ═══════════
// NOTE: On a static host (e.g. GitHub Pages) there is no server to hold an API key,
// so calls to Anthropic's API are skipped and the app uses its local scoring/feedback
// logic instead (see localEvalECs, localEssayGrade, localFeedback). To enable real AI
// grading, deploy a small serverless proxy (Vercel/Netlify function) that holds your
// API key server-side, and point AI_ENDPOINT below at it.
var AI_ENDPOINT=null; // e.g. "https://your-proxy.vercel.app/api/claude"

async function callAI(msgs){
  if(!AI_ENDPOINT)return{_error:"AI endpoint not configured — using local scoring"};
  try{
    var body={model:"claude-sonnet-4-20250514",max_tokens:1000,messages:Array.isArray(msgs)?msgs:[{role:"user",content:String(msgs)}]};
    var r=await fetch(AI_ENDPOINT,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});
    var d=await r.json();
    if(!r.ok)return{_error:(d&&d.error&&d.error.message)||("API status "+r.status)};
    var t="";
    if(d.content){for(var i=0;i<d.content.length;i++){if(d.content[i].type==="text")t+=d.content[i].text}}
    if(!t)return{_error:"Empty response"};
    t=t.replace(/```json\s*/g,"").replace(/```\s*/g,"").trim();
    var start=-1,bracket="";
    for(var j=0;j<t.length;j++){if(t[j]==="{"||t[j]==="["){start=j;bracket=t[j];break}}
    if(start>=0){var close=bracket==="{"?"}":"]",depth=0,end=-1;
      for(var k=start;k<t.length;k++){if(t[k]===bracket)depth++;if(t[k]===close){depth--;if(depth===0){end=k;break}}}
      if(end>start)try{return JSON.parse(t.substring(start,end+1))}catch(e){}}
    try{return JSON.parse(t)}catch(e){return{_error:"Parse failed: "+t.substring(0,100)}}
  }catch(e){return{_error:e.message||"Network error"}}
}

async function callAIFile(prompt,fileData,mediaType){
  if(!AI_ENDPOINT)return null;
  try{
    var docType=mediaType.indexOf("pdf")>=0?"document":"image";
    var content=[{type:docType,source:{type:"base64",media_type:mediaType,data:fileData}},{type:"text",text:prompt}];
    var r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,messages:[{role:"user",content:content}]})});
    var d=await r.json();
    if(!r.ok)return null;
    var t="";if(d.content){for(var i=0;i<d.content.length;i++){if(d.content[i].type==="text")t+=d.content[i].text}}
    t=t.replace(/```json\s*/g,"").replace(/```\s*/g,"").trim();
    var start=-1,bracket="";
    for(var j=0;j<t.length;j++){if(t[j]==="{"||t[j]==="["){start=j;bracket=t[j];break}}
    if(start>=0){var close=bracket==="{"?"}":"]",depth=0,end=-1;
      for(var k=start;k<t.length;k++){if(t[k]===bracket)depth++;if(t[k]===close){depth--;if(depth===0){end=k;break}}}
      if(end>start)return JSON.parse(t.substring(start,end+1))}
    return JSON.parse(t);
  }catch(e){console.error(e);return null}
}

function localEvalECs(ecs){
  return ecs.map(function(ec){
    var text=(ec.title+" "+ec.description).toLowerCase();
    var tier=4,label="Foundational",reasoning="General participation";
    // Tier 1: national/international
    if(/\b(national|international|intel|olympiad|usamo|isef|published|patent|d1\b|division\s*[i1]|grammy|emmy|congressional|presidential)\b/i.test(text)){
      tier=1;label="Exceptional";reasoning="National/international scope detected";}
    // Tier 2: state/regional or significant leadership
    else if(/\b(state\s*(champion|winner|finalist|award|level|competition)|regional|all[\s-]state|all[\s-]american|varsity\s*captain|student\s*body\s*president|editor[\s-]in[\s-]chief|research\s*intern|won\s*first|gold\s*medal)\b/i.test(text)){
      tier=2;label="Distinguished";reasoning="State-level recognition or major leadership";}
    // Tier 3: school leadership
    else if(/\b(president|founder|co[\s-]?founder|captain|director|chair|head|lead|editor|eagle\s*scout|gold\s*award|officer|manager|coordinator|organized|created|launched|built|raised\s*\$|mentor)\b/i.test(text)){
      tier=3;label="Impactful";reasoning="Leadership or significant initiative";}
    // Tier 4: everything else
    else{reasoning="Participation without major leadership keywords";}
    return{title:ec.title,tier:tier,label:label,reasoning:reasoning};
  });
}

function localFeedback(profile){
  var gpa=parseFloat(profile.gpa)||0;
  var sat=parseInt(profile.sat)||0;
  var strengths=[],concerns=[],plan=[];

  if(gpa>=3.9)strengths.push("Your "+gpa+" GPA is excellent and competitive for even the most selective schools.");
  else if(gpa>=3.7)strengths.push("A "+gpa+" GPA is strong and competitive for most selective schools.");
  else if(gpa>=3.5)strengths.push("Your "+gpa+" GPA is solid for many competitive schools.");
  else concerns.push("A "+gpa+" GPA may limit options at highly selective schools. An upward trend in grades helps.");

  if(!profile.testOptional){
    if(sat>=1500)strengths.push("An SAT of "+sat+" puts you in the top tier of test scores nationally.");
    else if(sat>=1350)strengths.push("Your SAT of "+sat+" is competitive for selective schools.");
    else if(sat>=1200)concerns.push("An SAT of "+sat+" is below average for highly selective schools. Consider retaking or going test-optional.");
    else concerns.push("Your SAT of "+sat+" may significantly limit options at selective schools. Consider test-optional.");
  }else{concerns.push("Applying test-optional means other factors (GPA, ECs, essays) must be stronger to compensate, especially at schools with avg SAT above 1400.")}

  if(profile.courseRigor>=70)strengths.push("Strong course rigor ("+profile.courseRigor+"/100) shows you challenged yourself academically.");
  else if(profile.courseRigor<=30)concerns.push("Low course rigor score. Taking more AP/IB/Honors courses would strengthen your profile.");

  if(profile.essayScore>=65)strengths.push("Your essay score of "+profile.essayScore+"/100 is above average and will help your application.");
  else if(profile.essayScore<=40)concerns.push("Your essay needs work ("+profile.essayScore+"/100). A compelling personal essay can significantly move the needle.");
  else concerns.push("Your essay is average ("+profile.essayScore+"/100). Revision with specific personal stories could improve it.");

  var ecCount=(profile.ecs||[]).length;
  if(ecCount===0)concerns.push("No extracurriculars listed — this is a major red flag for any selective school. Even part-time work or family responsibilities count.");
  else if(ecCount<=2)concerns.push("Only "+ecCount+" activities listed. Most competitive applicants have 5-8 meaningful activities.");
  else if(ecCount>=5)strengths.push(ecCount+" extracurricular activities show well-rounded engagement.");

  var hasTier1=(profile.ecs||[]).some(function(e){return e.tier===1});
  var hasTier2=(profile.ecs||[]).some(function(e){return e.tier<=2});
  if(hasTier1)strengths.push("You have a national/international-level activity — this is a significant differentiator.");
  else if(!hasTier2&&ecCount>0)concerns.push("Your activities lack state-level or major leadership recognition. Deepening one activity to a higher level would help.");

  if(concerns.length>strengths.length)plan.push({area:"Biggest gap",action:"Focus on strengthening your weakest area before applications are due."});
  if(profile.essayScore<60)plan.push({area:"Essay",action:"Rewrite your essay with a specific personal story. Show, don't tell. Get feedback from 2-3 readers."});
  if(ecCount<4)plan.push({area:"Activities",action:"Document all activities including jobs, family responsibilities, and informal projects."});

  var summary="Your profile features a "+gpa+" GPA"+(profile.testOptional?" (test-optional)":(" and "+sat+" SAT"))+
    " with "+ecCount+" activities and a course rigor of "+profile.courseRigor+"/100. "+
    (strengths.length>concerns.length?"Overall, you have a competitive foundation.":"There are areas that need attention to maximize your chances.");

  var advice=gpa>=3.7&&(sat>=1400||profile.testOptional)?
    "You have the academic foundation for selective schools. Your success will depend heavily on essay quality and extracurricular depth. Apply Early Decision to your top choice for a meaningful boost.":
    "Focus on building a balanced list with realistic targets. Strengthen your weakest area — whether that's test scores, activities, or essays — before submitting applications.";

  var schoolStrategy=gpa>=3.8?"Include 3-4 reach schools, 4-5 targets, and 2-3 safeties. Your academics open doors, but holistic factors determine outcomes at reaches.":
    "Prioritize target and safety schools where your GPA is at or above the average. Include 1-2 reach schools where you have a compelling hook.";

  return{summary:summary,strengths:strengths.slice(0,4),concerns:concerns.slice(0,4),advice:advice,improvementPlan:plan,schoolStrategy:schoolStrategy};
}

// API-enhanced versions (try API, fall back to local)
function evalECs(ecs){
  if(!ecs.length)return Promise.resolve([]);
  var localResult=localEvalECs(ecs);
  var list="";for(var i=0;i<ecs.length;i++)list+=(i+1)+'. "'+ecs[i].title+'": '+ecs[i].description+"\n";
  var prompt='Evaluate these extracurriculars for college admissions. Assign ONE tier each.\n'+
    'T1=National/intl distinction T2=State/regional T3=School leadership T4=Participation\n'+
    'Activities:\n'+list+'JSON ONLY:[{"title":"...","tier":1,"label":"Exceptional","reasoning":"why"}]';
  return callAI([{role:"user",content:prompt}]).then(function(res){
    if(res&&!res._error&&Array.isArray(res))return res;
    return localResult;
  })["catch"](function(){return localResult});
}

function gradeEssay(text){
  var local=localEssayGrade(text);
  var safeText=text.replace(/[\u201C\u201D]/g,'"').replace(/[\u2018\u2019]/g,"'").replace(/[\u2028\u2029]/g,"\n");
  if(safeText.length>3000)safeText=safeText.substring(0,3000);
  var prompt='Grade this college essay 1-100. TOUGH grading (most=35-65). JSON ONLY:\n'+
    '{"score":50,"breakdown":[{"criterion":"Theme","points":7,"maxPoints":12,"note":"why"}],"strengths":["s1"],"improvements":["i1","i2"],"overallFeedback":"1 sentence"}\nESSAY:\n'+safeText;
  return callAI([{role:"user",content:prompt}]).then(function(res){
    if(res&&!res._error&&typeof res.score==="number")return res;
    return local;
  })["catch"](function(){return local});
}

function gradeEssayFile(fileData,mediaType){
  var prompt='Grade this college essay 1-100. TOUGH (most=35-65). JSON ONLY:\n'+
    '{"score":50,"breakdown":[{"criterion":"Theme","points":7,"maxPoints":12,"note":"why"}],"strengths":["s1"],"improvements":["i1"],"overallFeedback":"1 sentence"}';
  return callAIFile(prompt,fileData,mediaType).then(function(res){
    if(res&&typeof res.score==="number")return res;
    return{score:0,strengths:[],improvements:["Could not read file — try pasting text instead"],overallFeedback:"File could not be processed.",_failed:true,breakdown:[]};
  })["catch"](function(){return{score:0,strengths:[],improvements:["Upload failed — try pasting text"],overallFeedback:"Upload error.",_failed:true,breakdown:[]}});
}

function genFeedback(profile){
  var localResult=localFeedback(profile);
  var ecList=(profile.ecs||[]).map(function(e){return e.title+" ("+e.label+")"}).join(", ")||"None";
  var prompt='College counselor: analyze. GPA:'+profile.gpa+(profile.testOptional?' TEST-OPT':' SAT:'+profile.sat)+
    ' Rigor:'+profile.courseRigor+' ECs:'+ecList+' Essay:'+profile.essayScore+'\n'+
    'JSON:{"summary":"2 sent","strengths":["s1","s2"],"concerns":["c1","c2"],"advice":"2 sent","schoolStrategy":"1 sent"}';
  return callAI([{role:"user",content:prompt}]).then(function(res){
    if(res&&!res._error&&res.summary)return res;
    return localResult;
  })["catch"](function(){return localResult});
}

function parseFileForCourses(fileData,mediaType){
  return callAIFile('Extract courses from this transcript. JSON array ONLY:\n[{"name":"AP Chemistry","type":"AP","grade":"A","apScore":5}]',fileData,mediaType).then(function(r){
    return Array.isArray(r)?r:[];
  })["catch"](function(){return[]});
}

function parseFileForECs(fileData,mediaType){
  return callAIFile('Extract activities from this document. JSON array ONLY:\n[{"title":"Name","description":"Role"}]',fileData,mediaType).then(function(r){
    return Array.isArray(r)?r:[];
  })["catch"](function(){return[]});
}

// ═══════════ MAIN APP ═══════════
export default function App(){
const[dark,setDark]=useState(false);
const[step,setStep]=useState(0);
const[profile,setProfile]=useState({gpa:"",sat:"",act:""});
const[testOptional,setTestOptional]=useState(false);
const[factors,setFactors]=useState({legacy:false,firstGen:false,athlete:false,urm:false,international:false,demonstratedInterest:false,earlyDecision:false});
const[courses,setCourses]=useState([]);
const[courseDraft,setCourseDraft]=useState({name:"",type:"AP",grade:"A",apScore:""});
const[ecs,setEcs]=useState([]);
const[ecDraft,setEcDraft]=useState({title:"",description:""});
const[ecResults,setEcResults]=useState([]);
const[essayText,setEssayText]=useState("");
const[essayMode,setEssayMode]=useState(null);
const[selfRating,setSelfRating]=useState(50);
const[essayResult,setEssayResult]=useState(null);
const[essayScore,setEssayScore]=useState(50);
const[lorAnswers,setLorAnswers]=useState({closeness:'moderate',teacherType:'core',performance:'strong',extra:false});
const[feedback,setFeedback]=useState(null);
const[allResults,setAllResults]=useState([]);
const[search,setSearch]=useState("");
const[tab,setTab]=useState("All");
const[sortBy,setSortBy]=useState("chance");
const[showCount,setShowCount]=useState(30);
const[loadMsg,setLoadMsg]=useState("");
const[watchlist,setWatchlist]=useState({});
const[showWL,setShowWL]=useState(false);
const[uploading,setUploading]=useState(false);
const[imgFails,setImgFails]=useState({});
const[selectedCollege,setSelectedCollege]=useState(null);
const[selectedMajors,setSelectedMajors]=useState({});

var effSAT=useMemo(function(){if(testOptional)return 0;var s=parseInt(profile.sat)||0,a=parseInt(profile.act)||0;if(s>0&&a>0)return Math.max(s,actToSat(a));if(s>0)return s;if(a>0)return actToSat(a);return 0},[profile.sat,profile.act,testOptional]);
var canGo=parseFloat(profile.gpa)>0&&parseFloat(profile.gpa)<=4&&(testOptional||effSAT>=400);
var courseRigor=useMemo(function(){return calcCourseRigor(courses)},[courses]);
var lorScoreVal=useMemo(function(){return calcLorScore(lorAnswers)},[lorAnswers]);

var addCourse=function(){if(courseDraft.name.trim()){setCourses(function(p){return p.concat([Object.assign({},courseDraft,{apScore:courseDraft.apScore?parseInt(courseDraft.apScore):null})])});setCourseDraft({name:"",type:"AP",grade:"A",apScore:""})}};
var addEC=function(){if(ecDraft.title.trim()&&ecDraft.description.trim()){setEcs(function(p){return p.concat([Object.assign({},ecDraft)])});setEcDraft({title:"",description:""})}};
var toggleWL=function(name){setWatchlist(function(p){var n=Object.assign({},p);if(n[name])delete n[name];else n[name]=true;return n})};

var handleFileUpload=function(type){
  var input=document.createElement('input');input.type='file';input.accept='.pdf,.png,.jpg,.jpeg,.webp';
  input.onchange=function(e){
    var file=e.target.files&&e.target.files[0];if(!file)return;
    setUploading(true);
    var reader=new FileReader();
    reader.onerror=function(){setUploading(false)};
    reader.onload=function(){
      try{
        var b64=reader.result.split(',')[1];
        var mt=file.type||'application/pdf';
        if(type==='course'){
          parseFileForCourses(b64,mt).then(function(res){if(res&&res.length)setCourses(function(p){return p.concat(res.map(function(c){return Object.assign({},c,{apScore:c.apScore||null})}))})})["catch"](function(){})["finally"](function(){setUploading(false)});
        }else{
          parseFileForECs(b64,mt).then(function(res){if(res&&res.length)setEcs(function(p){return p.concat(res)})})["catch"](function(){})["finally"](function(){setUploading(false)});
        }
      }catch(err){setUploading(false)}
    };reader.readAsDataURL(file);
  };input.click();
};

var handleEssayFileUpload=function(){
  var input=document.createElement('input');input.type='file';input.accept='.pdf,.png,.jpg,.jpeg,.webp';
  input.onchange=function(e){
    var file=e.target.files&&e.target.files[0];if(!file)return;
    setLoadMsg("Reading your essay file...");setStep(98);
    var reader=new FileReader();
    reader.onerror=function(){setEssayResult({score:0,breakdown:[],strengths:[],improvements:["File read error — try pasting text instead"],overallFeedback:"Could not read file.",_failed:true});setStep(3)};
    reader.onload=function(){
      try{
        var b64=reader.result.split(',')[1];
        var mt=file.type||'application/pdf';
        gradeEssayFile(b64,mt).then(function(result){setEssayResult(result);setEssayScore(result&&result.score?result.score:50);setStep(3)})["catch"](function(){setEssayResult({score:0,breakdown:[],strengths:[],improvements:["Upload processing failed"],overallFeedback:"Try pasting the text instead.",_failed:true});setStep(3)});
      }catch(err){setStep(3)}
    };reader.readAsDataURL(file);
  };input.click();
};

var handleGradeEssay=function(){
  if(!essayText.trim())return;
  setLoadMsg("Grading your essay...");setStep(98);
  gradeEssay(essayText).then(function(result){setEssayResult(result);setEssayScore(result&&result.score?result.score:50);setStep(3)})["catch"](function(){
    var local=localEssayGrade(essayText);setEssayResult(local);setEssayScore(local.score);setStep(3);
  });
};

var runAnalysis=function(){
  setStep(99);
  setLoadMsg("Evaluating your profile...");
  var finalEssay=essayMode==='paste'?(essayScore||50):(selfRating||50);
  var doScoring=function(ecEval){
    setEcResults(ecEval);
    var avgTier=ecEval.length?Math.round(ecEval.reduce(function(a,e){return a+e.tier},0)/ecEval.length):5;
    setLoadMsg("Generating feedback...");
    var profileData={gpa:parseFloat(profile.gpa),sat:effSAT,testOptional:testOptional,courseCount:courses.length,courseRigor:courseRigor,ecs:ecEval,essayScore:finalEssay,lorScore:lorScoreVal,factors:factors};
    genFeedback(profileData).then(function(fb){
      setFeedback(fb);
      setLoadMsg("Computing chances...");
      try{
        var results=C.map(function(c){
          var sc=scoreProfile(effSAT,parseFloat(profile.gpa),avgTier,courseRigor,finalEssay,factors,c,testOptional,lorScoreVal);
          var chance=computeChance(sc.total,c.sat);
          return Object.assign({},c,sc,{chance:chance,cat:getCat(chance)});
        }).sort(function(a,b){return b.chance-a.chance});
        setAllResults(results);
      }catch(e){console.error("Scoring error:",e);setAllResults([]);}
      setStep(5);
    })["catch"](function(e){
      console.error("Feedback error:",e);
      setFeedback(localFeedback(profileData));
      setAllResults([]);setStep(5);
    });
  };
  evalECs(ecs).then(doScoring)["catch"](function(e){
    console.error("EC eval error:",e);
    doScoring(localEvalECs(ecs));
  });
};

var filtered=useMemo(function(){
  var list=showWL?allResults.filter(function(c){return watchlist[c.name]}):allResults;
  if(search)list=list.filter(function(c){return c.name.toLowerCase().indexOf(search.toLowerCase())>=0});
  if(tab!=="All")list=list.filter(function(c){return c.cat.l===tab});
  if(sortBy==="name")list=list.slice().sort(function(a,b){return a.name.localeCompare(b.name)});
  else if(sortBy==="sat")list=list.slice().sort(function(a,b){return b.sat-a.sat});
  return list;
},[allResults,search,tab,sortBy,showWL,watchlist]);

var counts=useMemo(function(){var c={Safety:0,Target:0,Reach:0,"Hard Reach":0};allResults.forEach(function(r){c[r.cat.l]++});return c},[allResults]);
var pyrData=useMemo(function(){var t={1:0,2:0,3:0,4:0};ecResults.forEach(function(e){t[e.tier]++});return t},[ecResults]);

var th=dark?'dark':'light';

var Logo=function(props){
  var name=props.name,size=props.size||48;
  var domain=gD(name);
  if(imgFails[name])return React.createElement('div',{style:Object.assign({},avStyle(name),{width:size,height:size,borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:700,fontSize:size*.28,flexShrink:0})},initials(name));
  return React.createElement('img',{src:'https://logo.clearbit.com/'+domain,alt:'',style:{width:size,height:size,borderRadius:12,objectFit:'contain',background:dark?'#1e1e2e':'#f5f5f5',flexShrink:0},onError:function(){setImgFails(function(p){var n=Object.assign({},p);n[name]=true;return n})}});
};

var css='@import url("https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Outfit:wght@300;400;500;600;700&display=swap");'+
'*{box-sizing:border-box;margin:0;padding:0;transition:background .3s,color .3s,border-color .3s}'+
'input,textarea,select{font-family:"Outfit",sans-serif !important}'+
'[data-theme=dark]{--card:rgba(22,22,40,0.85);--border:rgba(255,255,255,0.08);--sub:#8888aa;--hover:rgba(255,255,255,0.04);--inp:rgba(255,255,255,0.06)}'+
'[data-theme=light]{--card:rgba(255,255,255,0.85);--border:rgba(0,0,0,0.07);--sub:#64648c;--hover:rgba(0,0,0,0.02);--inp:rgba(255,255,255,0.7)}'+
'.glass{background:var(--card);backdrop-filter:blur(20px);border:1px solid var(--border);border-radius:20px;box-shadow:0 8px 32px rgba(0,0,0,.08)}'+
'.inp{width:100%;padding:12px 16px;border:1.5px solid var(--border);border-radius:12px;font-size:1rem;background:var(--inp);color:inherit;outline:none;font-family:"Outfit",sans-serif}'+
'.inp:focus{border-color:#5b5ea6}.inp::placeholder{color:var(--sub);opacity:.7}'+
'.orb{position:fixed;border-radius:50%;pointer-events:none;z-index:0;filter:blur(80px);opacity:.3}'+
'.o1{width:400px;height:400px;top:-100px;left:-100px;animation:f1 25s ease-in-out infinite}'+
'.o2{width:350px;height:350px;bottom:-80px;right:-80px;animation:f2 20s ease-in-out infinite}'+
'.o3{width:250px;height:250px;top:40%;left:60%;animation:f3 30s ease-in-out infinite}'+
'.o4{width:200px;height:200px;top:65%;left:8%;animation:f1 22s ease-in-out infinite reverse}'+
'@keyframes f1{0%,100%{transform:translate(0,0)}25%{transform:translate(60px,-40px)}50%{transform:translate(-30px,60px)}75%{transform:translate(40px,30px)}}'+
'@keyframes f2{0%,100%{transform:translate(0,0)}33%{transform:translate(-50px,-30px)}66%{transform:translate(40px,50px)}}'+
'@keyframes f3{0%,100%{transform:translate(0,0)}50%{transform:translate(-60px,40px)}}'+
'.particle{position:fixed;border-radius:50%;pointer-events:none;z-index:0}'+
'@keyframes drift{0%{transform:translateY(0) translateX(0);opacity:0}10%{opacity:1}90%{opacity:1}100%{transform:translateY(-100vh) translateX(50px);opacity:0}}'+
'.fadein{animation:fadein .5s ease}@keyframes fadein{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}'+
'.spin{animation:spin .8s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}'+
'.college-card{display:flex;gap:14px;padding:14px;border-radius:16px;border:1.5px solid var(--border);background:var(--card);backdrop-filter:blur(12px);transition:all .25s;cursor:pointer;position:relative}'+
'.college-card:hover{transform:translateY(-2px);box-shadow:0 12px 40px rgba(0,0,0,.12)}';

var stepNames=["Academics","Coursework","Activities","Essay & Context","Review"];

return(<div data-theme={th} style={{minHeight:'100vh',fontFamily:"'Outfit',sans-serif",background:dark?'#0a0a1a':'#f5f0eb',color:dark?'#e8e8f0':'#1a1a2e',transition:'background .5s,color .5s'}}>
<style>{css}</style>
<div className="orb o1" style={{background:dark?'#4338ca':'#c4b5fd'}}/><div className="orb o2" style={{background:dark?'#dc2626':'#fca5a5'}}/><div className="orb o3" style={{background:dark?'#2563eb':'#93c5fd'}}/><div className="orb o4" style={{background:dark?'#059669':'#86efac'}}/>
{Array.from({length:15}).map(function(_,i){return <div key={i} className="particle" style={{width:2+Math.random()*3,height:2+Math.random()*3,left:(Math.random()*100)+"%",top:(100+Math.random()*20)+"%",background:dark?'rgba(167,139,250,.4)':'rgba(91,94,166,.2)',animation:'drift '+(15+Math.random()*20)+'s linear '+(Math.random()*15)+'s infinite'}}/>})}

<button onClick={function(){setDark(function(d){return !d})}} style={{position:'fixed',top:20,right:20,zIndex:100,width:48,height:48,borderRadius:14,border:'1.5px solid var(--border)',background:'var(--card)',backdropFilter:'blur(12px)',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.3rem',color:'inherit'}}>{dark?'☀️':'🌙'}</button>

{step<5?(
<div style={{maxWidth:860,margin:'0 auto',padding:'24px 20px',position:'relative',zIndex:1,minHeight:'100vh'}}>
  {step<5&&<div className="fadein" style={{textAlign:'center',padding:'52px 0 32px'}}>
    <h1 style={{fontFamily:"'DM Serif Display',serif",fontSize:'2.6rem',lineHeight:1.15,marginBottom:10}}>Your Path to <span style={{background:'linear-gradient(135deg,#5b5ea6,#e07a5f)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Admission</span></h1>
    <p style={{color:'var(--sub)',fontSize:'.95rem',maxWidth:480,margin:'0 auto',fontWeight:300}}>AI-powered admissions analysis across 1,038 colleges</p>
  </div>}

  {step<=4&&step!==98&&step!==99&&<div style={{display:'flex',justifyContent:'center',gap:6,margin:'20px 0 28px'}}>
    {stepNames.map(function(nm,i){return <div key={i} onClick={function(){if(i<step)setStep(i)}} style={{display:'flex',alignItems:'center',gap:6,cursor:i<step?'pointer':'default',opacity:i<=step?1:.4}}>
      <div style={{width:i===step?28:10,height:10,borderRadius:5,background:i<=step?'#5b5ea6':'var(--border)',transition:'all .4s'}}/>
      {i===step&&<span style={{fontSize:'.75rem',fontWeight:500,color:'#5b5ea6'}}>{nm}</span>}
    </div>})}
  </div>}

  {/* ─── STEP 0: ACADEMICS ─── */}
  {step===0&&<div className="glass fadein" style={{padding:'36px 32px'}}>
    <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:'1.4rem',marginBottom:4}}>Academic Profile</h2>
    <p style={{color:'var(--sub)',marginBottom:20,fontWeight:300,fontSize:'.9rem'}}>Enter your GPA and test scores, or go test-optional.</p>

    {/* Test Optional Toggle */}
    <div onClick={function(){setTestOptional(function(v){return !v})}} style={{display:'flex',alignItems:'center',gap:12,padding:'14px 18px',border:'1.5px solid '+(testOptional?'#e07a5f':'var(--border)'),borderRadius:14,marginBottom:20,cursor:'pointer',background:testOptional?(dark?'rgba(224,122,95,0.1)':'#fef2f2'):'transparent',userSelect:'none'}}>
      <div style={{width:44,height:24,borderRadius:12,background:testOptional?'#e07a5f':'#ccc',position:'relative',transition:'background .2s'}}>
        <div style={{width:20,height:20,borderRadius:10,background:'white',position:'absolute',top:2,left:testOptional?22:2,transition:'left .2s',boxShadow:'0 1px 3px rgba(0,0,0,.2)'}}/>
      </div>
      <div>
        <div style={{fontWeight:600,fontSize:'.9rem'}}>Apply Test-Optional</div>
        <div style={{fontSize:'.72rem',color:'var(--sub)'}}>SAT/ACT not submitted. Note: may reduce competitiveness at highly selective schools.</div>
      </div>
    </div>

    <div style={{display:'grid',gridTemplateColumns:testOptional?'1fr':'1fr 1fr 1fr',gap:16}}>
      <div><label style={{display:'block',fontWeight:500,marginBottom:5,fontSize:'.85rem'}}>Unweighted GPA</label><input className="inp" type="number" step="0.01" min="0" max="4" placeholder="e.g. 3.85" value={profile.gpa} onChange={function(e){setProfile(function(p){return Object.assign({},p,{gpa:e.target.value})})}}/><div style={{fontSize:'.72rem',color:'var(--sub)',marginTop:3}}>4.0 scale only</div></div>
      {!testOptional&&<div><label style={{display:'block',fontWeight:500,marginBottom:5,fontSize:'.85rem'}}>SAT Score</label><input className="inp" type="number" min="400" max="1600" placeholder="400–1600" value={profile.sat} onChange={function(e){setProfile(function(p){return Object.assign({},p,{sat:e.target.value})})}}/></div>}
      {!testOptional&&<div><label style={{display:'block',fontWeight:500,marginBottom:5,fontSize:'.85rem'}}>ACT Score</label><input className="inp" type="number" min="1" max="36" placeholder="1–36" value={profile.act} onChange={function(e){setProfile(function(p){return Object.assign({},p,{act:e.target.value})})}}/></div>}
    </div>
    {testOptional&&<div style={{padding:'12px 16px',borderRadius:12,background:dark?'rgba(224,122,95,0.08)':'#fef9f6',border:'1px solid rgba(224,122,95,0.2)',fontSize:'.82rem',color:'#c2553a',marginTop:12,lineHeight:1.5}}>⚠ Test-optional applicants at schools with avg SAT ≥1400 may see reduced competitiveness. GPA, coursework, ECs, and essays will carry more weight.</div>}
    {!testOptional&&effSAT>0&&<p style={{fontSize:'.82rem',color:'#5b5ea6',marginTop:12}}>Effective SAT: <strong>{effSAT}</strong></p>}
    <div style={{display:'flex',gap:12,marginTop:24}}>
      <button disabled={!canGo} onClick={function(){setStep(1)}} style={{flex:1,padding:'14px 28px',border:'none',borderRadius:14,fontFamily:'inherit',fontSize:'1rem',fontWeight:600,cursor:canGo?'pointer':'not-allowed',background:canGo?'#5b5ea6':'#ccc',color:'white',opacity:canGo?1:.5}}>Continue →</button>
    </div>
  </div>}

  {/* ─── STEP 1: COURSEWORK ─── */}
  {step===1&&<div className="glass fadein" style={{padding:'36px 32px'}}>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:20}}>
      <div><h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:'1.4rem',marginBottom:4}}>Coursework</h2><p style={{color:'var(--sub)',fontWeight:300,fontSize:'.9rem'}}>Harder AP courses (Physics C, Calc BC, Chemistry) earn more rigor points.</p></div>
      <button onClick={function(){handleFileUpload('course')}} disabled={uploading} style={{padding:'10px 18px',border:'1.5px dashed var(--border)',borderRadius:12,background:'transparent',cursor:'pointer',fontFamily:'inherit',fontSize:'.82rem',color:'var(--sub)',whiteSpace:'nowrap'}}>{uploading?'Scanning...':'📄 Upload transcript'}</button>
    </div>
    {courses.length>0&&<div style={{marginBottom:16,maxHeight:240,overflowY:'auto'}}>
      {courses.map(function(c,i){return <div key={i} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 14px',border:'1px solid var(--border)',borderRadius:12,marginBottom:6,background:'var(--hover)',fontSize:'.85rem'}}>
        <span style={{padding:'2px 10px',borderRadius:6,background:c.type==='AP'?'#ede9fe':c.type==='IB'?'#e0f2fe':c.type==='Honors'?'#fef3c7':'#f1f5f9',color:c.type==='AP'?'#7c3aed':c.type==='IB'?'#0284c7':c.type==='Honors'?'#d97706':'#64748b',fontSize:'.72rem',fontWeight:600}}>{c.type}</span>
        <span style={{flex:1}}>{c.name}</span>
        <span style={{fontWeight:600}}>{c.grade}</span>
        {c.apScore&&<span style={{fontSize:'.75rem',color:'var(--sub)'}}>Exam: {c.apScore}</span>}
        <button onClick={function(){setCourses(function(p){return p.filter(function(_,j){return j!==i})})}} style={{background:'none',border:'none',cursor:'pointer',color:'var(--sub)',fontSize:'1rem'}}>✕</button>
      </div>})}
      <div style={{textAlign:'right',fontSize:'.8rem',color:'#5b5ea6',fontWeight:500}}>Course Rigor Score: {courseRigor}/100</div>
    </div>}
    <div style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr auto',gap:8,alignItems:'end'}}>
      <div><label style={{fontSize:'.78rem',fontWeight:500,display:'block',marginBottom:4}}>Course Name</label><input className="inp" placeholder="e.g. AP Chemistry" value={courseDraft.name} onChange={function(e){setCourseDraft(function(p){return Object.assign({},p,{name:e.target.value})})}}/></div>
      <div><label style={{fontSize:'.78rem',fontWeight:500,display:'block',marginBottom:4}}>Type</label><select className="inp" value={courseDraft.type} onChange={function(e){setCourseDraft(function(p){return Object.assign({},p,{type:e.target.value})})}} style={{padding:'12px 8px'}}><option>AP</option><option>IB</option><option>Honors</option><option>DE</option><option>Regular</option></select></div>
      <div><label style={{fontSize:'.78rem',fontWeight:500,display:'block',marginBottom:4}}>Grade</label><select className="inp" value={courseDraft.grade} onChange={function(e){setCourseDraft(function(p){return Object.assign({},p,{grade:e.target.value})})}} style={{padding:'12px 8px'}}><option>A+</option><option>A</option><option>A-</option><option>B+</option><option>B</option><option>B-</option><option>C+</option><option>C</option><option>C-</option><option>D</option><option>F</option></select></div>
      <div><label style={{fontSize:'.78rem',fontWeight:500,display:'block',marginBottom:4}}>AP/IB Exam</label><input className="inp" type="number" min="1" max="7" placeholder="1-5" value={courseDraft.apScore} onChange={function(e){setCourseDraft(function(p){return Object.assign({},p,{apScore:e.target.value})})}}/></div>
      <button onClick={addCourse} disabled={!courseDraft.name.trim()} style={{padding:'12px 20px',border:'none',borderRadius:12,background:'#5b5ea6',color:'white',cursor:'pointer',fontFamily:'inherit',fontWeight:600,fontSize:'.9rem',height:46}}>+</button>
    </div>
    <div style={{display:'flex',gap:12,marginTop:28}}>
      <button onClick={function(){setStep(0)}} style={{padding:'14px 24px',border:'1.5px solid var(--border)',borderRadius:14,background:'transparent',cursor:'pointer',fontFamily:'inherit',color:'var(--sub)'}}>Back</button>
      <button onClick={function(){setStep(2)}} style={{flex:1,padding:'14px',border:'none',borderRadius:14,fontFamily:'inherit',fontSize:'1rem',fontWeight:600,cursor:'pointer',background:'#5b5ea6',color:'white'}}>Continue →</button>
    </div>
  </div>}

  {/* ─── STEP 2: ECs ─── */}
  {step===2&&<div className="glass fadein" style={{padding:'36px 32px'}}>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:16}}>
      <div><h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:'1.4rem',marginBottom:4}}>Extracurriculars</h2><p style={{color:'var(--sub)',fontWeight:300,fontSize:'.9rem'}}>AI evaluates each activity's admissions impact via keyword analysis.</p></div>
      <button onClick={function(){handleFileUpload('ec')}} disabled={uploading} style={{padding:'10px 18px',border:'1.5px dashed var(--border)',borderRadius:12,background:'transparent',cursor:'pointer',fontFamily:'inherit',fontSize:'.82rem',color:'var(--sub)',whiteSpace:'nowrap'}}>{uploading?'Scanning...':'📄 Upload resume'}</button>
    </div>
    {ecs.map(function(ec,i){return <div key={i} style={{display:'flex',gap:10,padding:'12px 14px',border:'1px solid var(--border)',borderRadius:12,marginBottom:8,background:'var(--hover)'}}>
      <div style={{flex:1}}><div style={{fontWeight:600,fontSize:'.88rem'}}>{ec.title}</div><div style={{fontSize:'.78rem',color:'var(--sub)',marginTop:2}}>{ec.description}</div></div>
      <button onClick={function(){setEcs(function(p){return p.filter(function(_,j){return j!==i})})}} style={{background:'none',border:'none',cursor:'pointer',color:'var(--sub)',fontSize:'1.1rem',padding:4}}>✕</button>
    </div>})}
    <div style={{display:'grid',gap:8,marginBottom:12}}>
      <input className="inp" placeholder="Activity title (e.g. Varsity Tennis Captain)" value={ecDraft.title} onChange={function(e){setEcDraft(function(p){return Object.assign({},p,{title:e.target.value})})}}/>
      <textarea className="inp" placeholder="Describe your role, achievements, and recognition received" rows={2} value={ecDraft.description} onChange={function(e){setEcDraft(function(p){return Object.assign({},p,{description:e.target.value})})}} style={{resize:'vertical',minHeight:60}}/>
      <button onClick={addEC} disabled={!ecDraft.title.trim()||!ecDraft.description.trim()} style={{padding:'12px',border:'2px dashed var(--border)',borderRadius:14,background:'transparent',cursor:'pointer',fontFamily:'inherit',color:'var(--sub)',fontSize:'.9rem'}}>+ Add Activity</button>
    </div>
    <div style={{display:'flex',gap:12,marginTop:24}}>
      <button onClick={function(){setStep(1)}} style={{padding:'14px 24px',border:'1.5px solid var(--border)',borderRadius:14,background:'transparent',cursor:'pointer',fontFamily:'inherit',color:'var(--sub)'}}>Back</button>
      <button onClick={function(){setStep(3)}} style={{flex:1,padding:'14px',border:'none',borderRadius:14,fontFamily:'inherit',fontSize:'1rem',fontWeight:600,cursor:'pointer',background:'#5b5ea6',color:'white'}}>Continue →</button>
    </div>
  </div>}

  {/* ─── STEP 3: ESSAY + LOR + FACTORS ─── */}
  {step===3&&<div className="glass fadein" style={{padding:'36px 32px'}}>
    <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:'1.4rem',marginBottom:4}}>Essay, Recommendations & Factors</h2>
    <p style={{color:'var(--sub)',marginBottom:20,fontWeight:300,fontSize:'.9rem'}}>Grade your essay via AI or self-assess. Estimate your recommendation strength.</p>

    {/* Essay */}
    <h3 style={{fontSize:'.95rem',fontWeight:600,marginBottom:10}}>College Essay</h3>
    {!essayMode&&<div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10,marginBottom:20}}>
      <button onClick={function(){setEssayMode('paste')}} style={{padding:'20px 16px',border:'1.5px solid var(--border)',borderRadius:14,background:'var(--hover)',cursor:'pointer',fontFamily:'inherit',textAlign:'left'}}>
        <div style={{fontSize:'1.3rem',marginBottom:6}}>📝</div>
        <div style={{fontWeight:600,fontSize:'.85rem',marginBottom:2}}>Paste Essay</div>
        <div style={{fontSize:'.72rem',color:'var(--sub)'}}>AI grading on 11 criteria</div>
      </button>
      <button onClick={handleEssayFileUpload} style={{padding:'20px 16px',border:'1.5px solid var(--border)',borderRadius:14,background:'var(--hover)',cursor:'pointer',fontFamily:'inherit',textAlign:'left'}}>
        <div style={{fontSize:'1.3rem',marginBottom:6}}>📄</div>
        <div style={{fontWeight:600,fontSize:'.85rem',marginBottom:2}}>Upload Essay</div>
        <div style={{fontSize:'.72rem',color:'var(--sub)'}}>PDF or image file</div>
      </button>
      <button onClick={function(){setEssayMode('self')}} style={{padding:'20px 16px',border:'1.5px solid var(--border)',borderRadius:14,background:'var(--hover)',cursor:'pointer',fontFamily:'inherit',textAlign:'left'}}>
        <div style={{fontSize:'1.3rem',marginBottom:6}}>⚡</div>
        <div style={{fontWeight:600,fontSize:'.85rem',marginBottom:2}}>Self-Assess</div>
        <div style={{fontSize:'.72rem',color:'var(--sub)'}}>Quick honest rating</div>
      </button>
    </div>}

    {essayMode==='paste'&&<div style={{marginBottom:20}}>
      <textarea className="inp" rows={6} placeholder="Paste your college essay here — any format works..." value={essayText} onChange={function(e){setEssayText(e.target.value)}} style={{resize:'vertical',minHeight:140,lineHeight:1.6}}/>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:8}}>
        <span style={{fontSize:'.8rem',color:'var(--sub)'}}>{essayText.trim().split(/\s+/).filter(Boolean).length} words</span>
        <div style={{display:'flex',gap:8}}>
          <button onClick={function(){setEssayMode(null);setEssayText("");setEssayResult(null)}} style={{padding:'8px 16px',border:'1px solid var(--border)',borderRadius:10,background:'transparent',cursor:'pointer',fontFamily:'inherit',fontSize:'.82rem',color:'var(--sub)'}}>Cancel</button>
          <button onClick={handleGradeEssay} disabled={!essayText.trim()} style={{padding:'8px 20px',border:'none',borderRadius:10,background:'#5b5ea6',color:'white',cursor:'pointer',fontFamily:'inherit',fontSize:'.82rem',fontWeight:600}}>Grade Essay</button>
        </div>
      </div>
    </div>}

    {essayMode==='self'&&<div style={{marginBottom:20}}>
      <label style={{fontSize:'.85rem',fontWeight:500,display:'block',marginBottom:8}}>Rate your essay honestly (most are 40–60):</label>
      <div style={{display:'flex',alignItems:'center',gap:16}}>
        <input type="range" min="10" max="100" value={selfRating} onChange={function(e){setSelfRating(parseInt(e.target.value));setEssayScore(parseInt(e.target.value))}} style={{flex:1,accentColor:'#5b5ea6'}}/>
        <span style={{fontWeight:700,fontSize:'1.2rem',minWidth:40,textAlign:'center'}}>{selfRating}</span>
      </div>
      <div style={{display:'flex',justifyContent:'space-between',fontSize:'.72rem',color:'var(--sub)',marginTop:4}}><span>Generic draft</span><span>Average</span><span>Truly compelling</span></div>
    </div>}

    {/* Essay result */}
    {essayResult&&<div style={{marginBottom:20,padding:'18px 22px',border:'1px solid '+(essayResult._failed?'#ef4444':'var(--border)'),borderRadius:16,background:essayResult._failed?(dark?'rgba(239,68,68,0.08)':'#fef2f2'):'var(--hover)'}}>
      {essayResult._failed?(<div>
        <div style={{fontWeight:600,color:'#ef4444',marginBottom:6}}>Grading failed</div>
        <div style={{fontSize:'.85rem',color:'var(--sub)',marginBottom:12}}>{essayResult.overallFeedback}</div>
        <button onClick={handleGradeEssay} style={{padding:'8px 20px',border:'none',borderRadius:10,background:'#5b5ea6',color:'white',cursor:'pointer',fontFamily:'inherit',fontSize:'.82rem',fontWeight:600}}>Retry</button>
      </div>):(<div>
        <div style={{display:'flex',alignItems:'center',gap:16,marginBottom:14}}>
          <div style={{width:56,height:56,borderRadius:14,background:'conic-gradient(#5b5ea6 '+(essayResult.score*3.6)+'deg, var(--border) 0)',display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:44,height:44,borderRadius:11,background:dark?'#16162a':'white',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:'1.1rem'}}>{essayResult.score}</div></div>
          <div style={{flex:1}}><div style={{fontWeight:600}}>Essay Score: {essayResult.score}/100 {essayResult._local&&<span style={{fontSize:'.7rem',color:'var(--sub)'}}>(local scoring)</span>}</div><div style={{fontSize:'.8rem',color:'var(--sub)',lineHeight:1.5,marginTop:3}}>{essayResult.overallFeedback}</div></div>
        </div>
        {essayResult.breakdown&&essayResult.breakdown.length>0&&<div style={{marginBottom:10}}>
          {essayResult.breakdown.map(function(b,i){return <div key={i} style={{display:'flex',alignItems:'center',gap:6,marginBottom:3,fontSize:'.78rem'}}>
            <div style={{width:90,flexShrink:0,fontSize:'.7rem',color:'var(--sub)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{(b.criterion||'').substring(0,16)}</div>
            <div style={{flex:1,height:5,borderRadius:3,background:dark?'rgba(255,255,255,0.06)':'#eee'}}><div style={{height:'100%',borderRadius:3,background:b.points>=b.maxPoints*0.7?'#10b981':b.points>=b.maxPoints*0.4?'#f59e0b':'#ef4444',width:Math.round((b.points/(b.maxPoints||1))*100)+'%'}}/></div>
            <span style={{fontSize:'.7rem',fontWeight:600,minWidth:28,textAlign:'right'}}>{b.points}/{b.maxPoints}</span>
          </div>})}
        </div>}
        {essayResult.improvements&&essayResult.improvements.length>0&&<div>
          <div style={{fontSize:'.75rem',fontWeight:600,marginBottom:4,color:'#e07a5f'}}>How to Improve:</div>
          {essayResult.improvements.map(function(imp,i){return <div key={i} style={{fontSize:'.8rem',color:dark?'#ccc':'#555',padding:'2px 0'}}>→ {imp}</div>})}
        </div>}
      </div>)}
    </div>}

    {/* LOR Assessment */}
    <h3 style={{fontSize:'.95rem',fontWeight:600,marginBottom:8,marginTop:16}}>Letter of Recommendation Estimate</h3>
    <p style={{fontSize:'.78rem',color:'var(--sub)',marginBottom:12}}>You likely won't see your LOR, but these questions estimate its strength.</p>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:16}}>
      <div>
        <label style={{fontSize:'.78rem',fontWeight:500,display:'block',marginBottom:4}}>How well does this teacher know you?</label>
        <select className="inp" value={lorAnswers.closeness} onChange={function(e){setLorAnswers(function(p){return Object.assign({},p,{closeness:e.target.value})})}} style={{padding:'10px 12px'}}>
          <option value="very">Very well — regular conversations, mentorship</option>
          <option value="moderate">Moderately — good classroom rapport</option>
          <option value="slight">Slightly — just a student in class</option>
        </select>
      </div>
      <div>
        <label style={{fontSize:'.78rem',fontWeight:500,display:'block',marginBottom:4}}>Teacher type?</label>
        <select className="inp" value={lorAnswers.teacherType} onChange={function(e){setLorAnswers(function(p){return Object.assign({},p,{teacherType:e.target.value})})}} style={{padding:'10px 12px'}}>
          <option value="core">Core academic (Math, Science, English, History)</option>
          <option value="elective">Elective / Arts / PE</option>
          <option value="counselor">School counselor</option>
        </select>
      </div>
      <div>
        <label style={{fontSize:'.78rem',fontWeight:500,display:'block',marginBottom:4}}>Your performance in their class?</label>
        <select className="inp" value={lorAnswers.performance} onChange={function(e){setLorAnswers(function(p){return Object.assign({},p,{performance:e.target.value})})}} style={{padding:'10px 12px'}}>
          <option value="top">Top of class — stood out significantly</option>
          <option value="strong">Strong student — consistently good</option>
          <option value="average">Average performance</option>
        </select>
      </div>
      <div onClick={function(){setLorAnswers(function(p){return Object.assign({},p,{extra:!p.extra})})}} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 14px',border:'1.5px solid '+(lorAnswers.extra?'#5b5ea6':'var(--border)'),borderRadius:12,cursor:'pointer',background:lorAnswers.extra?(dark?'rgba(91,94,166,0.12)':'rgba(91,94,166,0.04)'):'transparent',alignSelf:'end'}}>
        <div style={{width:18,height:18,borderRadius:5,border:'2px solid '+(lorAnswers.extra?'#5b5ea6':'#ccc'),background:lorAnswers.extra?'#5b5ea6':'transparent',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'.65rem'}}>{lorAnswers.extra&&'✓'}</div>
        <div style={{fontSize:'.82rem'}}>Engaged beyond class (office hours, research, club advisor)</div>
      </div>
    </div>
    <div style={{fontSize:'.8rem',color:'#5b5ea6',fontWeight:500,marginBottom:16}}>Estimated LOR Strength: {lorScoreVal}/100</div>

    {/* Factors */}
    <h3 style={{fontSize:'.95rem',fontWeight:600,marginBottom:10}}>Application Factors</h3>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:16}}>
      {[["legacy","Legacy Applicant","Parent/grandparent attended target school"],
        ["firstGen","First-Generation Student","Neither parent has a 4-year degree"],
        ["athlete","Recruited Athlete","Coach contact, visit, or verbal offer"],
        ["urm","Underrepresented Minority","Black, Hispanic/Latino, or Native American"],
        ["international","International Applicant","Non-US citizen / permanent resident"],
        ["demonstratedInterest","Demonstrated Interest","Campus visits, info sessions, admissions contact"],
        ["earlyDecision","Early Decision / EA","Applying in an early round"]
      ].map(function(arr){var key=arr[0],label=arr[1],desc=arr[2];return(
        <div key={key} onClick={function(){setFactors(function(p){var n=Object.assign({},p);n[key]=!n[key];return n})}} style={{display:'flex',alignItems:'center',gap:10,padding:'11px 14px',border:'1.5px solid '+(factors[key]?'#5b5ea6':'var(--border)'),borderRadius:12,cursor:'pointer',background:factors[key]?(dark?'rgba(91,94,166,0.12)':'rgba(91,94,166,0.04)'):'transparent',userSelect:'none'}}>
          <div style={{width:18,height:18,borderRadius:5,border:'2px solid '+(factors[key]?'#5b5ea6':'#ccc'),background:factors[key]?'#5b5ea6':'transparent',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'.65rem',flexShrink:0}}>{factors[key]&&'✓'}</div>
          <div><div style={{fontSize:'.82rem',fontWeight:500,lineHeight:1.3}}>{label}</div><div style={{fontSize:'.68rem',color:'var(--sub)'}}>{desc}</div></div>
        </div>
      )})}
    </div>

    <div style={{display:'flex',gap:12,marginTop:20}}>
      <button onClick={function(){setStep(2)}} style={{padding:'14px 24px',border:'1.5px solid var(--border)',borderRadius:14,background:'transparent',cursor:'pointer',fontFamily:'inherit',color:'var(--sub)'}}>Back</button>
      <button onClick={runAnalysis} style={{flex:1,padding:'14px',border:'none',borderRadius:14,fontFamily:'inherit',fontSize:'1rem',fontWeight:600,cursor:'pointer',background:'linear-gradient(135deg,#5b5ea6,#e07a5f)',color:'white'}}>Analyze My Profile →</button>
    </div>
  </div>}

  {/* Loading */}
  {(step===98||step===99)&&<div className="glass fadein" style={{padding:'80px 20px',textAlign:'center'}}>
    <div className="spin" style={{width:48,height:48,border:'3px solid var(--border)',borderTopColor:'#5b5ea6',borderRadius:'50%',margin:'0 auto 24px'}}/>
    <p style={{color:'var(--sub)',fontSize:'.95rem'}}>{loadMsg}</p>
  </div>}
</div>

):(

/* ═══════ RESULTS ═══════ */
<div style={{maxWidth:1100,margin:'0 auto',padding:'24px 20px',position:'relative',zIndex:1}} className="fadein">
  <div style={{textAlign:'center',padding:'36px 0 20px'}}>
    <h1 style={{fontFamily:"'DM Serif Display',serif",fontSize:'2.2rem',marginBottom:6}}>Your Admissions <span style={{background:'linear-gradient(135deg,#5b5ea6,#e07a5f)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Analysis</span></h1>
    <p style={{color:'var(--sub)',fontSize:'.9rem',fontWeight:300}}>GPA {profile.gpa}{testOptional?' · Test Optional':' · SAT '+effSAT+(profile.act?' · ACT '+profile.act:'')} · {courses.length} courses · {ecs.length} activities</p>
  </div>

  {feedback&&<div className="glass" style={{padding:'24px 28px',marginBottom:20}}>
    <h3 style={{fontFamily:"'DM Serif Display',serif",fontSize:'1.1rem',marginBottom:12}}>Personalized Feedback</h3>
    <p style={{fontSize:'.95rem',fontWeight:300,marginBottom:18,lineHeight:1.7}}>{feedback.summary}</p>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:18}}>
      <div><h4 style={{fontSize:'.78rem',textTransform:'uppercase',letterSpacing:1,marginBottom:8,fontWeight:600,color:'#10b981'}}>✦ Strengths</h4>
        {(feedback.strengths||[]).map(function(s,i){return <div key={i} style={{padding:'5px 0',fontSize:'.85rem',lineHeight:1.6,color:dark?'#ccc':'#444'}}>→ {s}</div>})}</div>
      <div><h4 style={{fontSize:'.78rem',textTransform:'uppercase',letterSpacing:1,marginBottom:8,fontWeight:600,color:'#ef4444'}}>⚑ Concerns</h4>
        {(feedback.concerns||[]).map(function(c,i){return <div key={i} style={{padding:'5px 0',fontSize:'.85rem',lineHeight:1.6,color:dark?'#ccc':'#444'}}>→ {c}</div>})}</div>
    </div>
    {feedback.advice&&<div style={{marginTop:16,padding:'14px 18px',background:dark?'rgba(91,94,166,0.1)':'rgba(91,94,166,0.04)',borderRadius:12,fontSize:'.88rem',lineHeight:1.7,borderLeft:'3px solid #5b5ea6'}}><strong>Strategy:</strong> {feedback.advice}</div>}
    {feedback.schoolStrategy&&<div style={{marginTop:10,padding:'14px 18px',background:dark?'rgba(224,122,95,0.08)':'rgba(224,122,95,0.04)',borderRadius:12,fontSize:'.85rem',lineHeight:1.6,borderLeft:'3px solid #e07a5f'}}><strong>School List Advice:</strong> {feedback.schoolStrategy}</div>}
    {feedback.improvementPlan&&feedback.improvementPlan.length>0&&<div style={{marginTop:14}}><h4 style={{fontSize:'.78rem',textTransform:'uppercase',letterSpacing:1,marginBottom:8,fontWeight:600,color:'#5b5ea6'}}>Action Plan</h4>
      {feedback.improvementPlan.map(function(item,i){return <div key={i} style={{padding:'5px 0',fontSize:'.85rem',lineHeight:1.5}}><strong>{item.area}:</strong> {item.action}</div>})}</div>}
  </div>}

  {ecResults.length>0&&<div className="glass" style={{padding:'20px 24px',marginBottom:20}}>
    <h3 style={{fontFamily:"'DM Serif Display',serif",fontSize:'1rem',marginBottom:12}}>Activity Tiers</h3>
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:3,marginBottom:14}}>
      {[[1,"Exceptional","#e07a5f",120],[2,"Distinguished","#5b5ea6",200],[3,"Impactful","#3b82f6",280],[4,"Foundational","#64748b",360]].map(function(arr){var tier=arr[0],label=arr[1],color=arr[2],w=arr[3];return(
        <div key={tier} style={{display:'flex',alignItems:'center',gap:10}}>
          <span style={{fontSize:'.72rem',color:'var(--sub)',width:85,textAlign:'right'}}>{label}</span>
          <div style={{width:w,height:28,borderRadius:7,background:color,opacity:pyrData[tier]?1:.15,display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'.72rem',fontWeight:600}}>{pyrData[tier]||0}</div>
        </div>
      )})}
    </div>
    <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
      {ecResults.map(function(ec,i){var colors=['','#e07a5f','#5b5ea6','#3b82f6','#94a3b8'];return <div key={i} style={{padding:'6px 12px',borderRadius:8,fontSize:'.75rem',background:(colors[ec.tier]||'#94a3b8')+'15',border:'1px solid '+(colors[ec.tier]||'#94a3b8')+'30'}}>
        <strong>{ec.title}</strong> <span style={{color:colors[ec.tier]||'#94a3b8',fontWeight:600}}>· {ec.label}</span>
        {ec.reasoning&&<div style={{fontSize:'.68rem',color:'var(--sub)',marginTop:2}}>{ec.reasoning}</div>}
      </div>})}
    </div>
  </div>}

  <div style={{display:'flex',gap:10,marginBottom:16,flexWrap:'wrap',alignItems:'center'}}>
    {[["Safety",counts.Safety,"#10b981"],["Target",counts.Target,"#3b82f6"],["Reach",counts.Reach,"#f59e0b"],["Hard Reach",counts["Hard Reach"],"#ef4444"]].map(function(arr){return(
      <div key={arr[0]} style={{padding:'8px 16px',borderRadius:10,fontSize:'.82rem',fontWeight:500,background:arr[2]+'15',color:arr[2]}}>{arr[1]} {arr[0]}</div>
    )})}
    <div style={{flex:1}}/>
    <button onClick={function(){setShowWL(function(w){return !w})}} style={{padding:'8px 16px',borderRadius:10,border:'1.5px solid '+(showWL?'#e07a5f':'var(--border)'),background:showWL?(dark?'rgba(224,122,95,0.15)':'#fef2f2'):'transparent',color:showWL?'#e07a5f':'var(--sub)',cursor:'pointer',fontFamily:'inherit',fontSize:'.82rem',fontWeight:500}}>★ Watchlist ({Object.keys(watchlist).length})</button>
    <button onClick={function(){setStep(0)}} style={{padding:'8px 16px',borderRadius:10,border:'1.5px solid var(--border)',background:'transparent',color:'var(--sub)',cursor:'pointer',fontFamily:'inherit',fontSize:'.82rem'}}>← Edit</button>
  </div>

  <div style={{display:'flex',gap:8,marginBottom:16,flexWrap:'wrap',alignItems:'center'}}>
    <input className="inp" placeholder="Search colleges..." value={search} onChange={function(e){setSearch(e.target.value);setShowCount(30)}} style={{flex:1,minWidth:200}}/>
    {["All","Safety","Target","Reach","Hard Reach"].map(function(t){return(
      <button key={t} onClick={function(){setTab(t);setShowCount(30)}} style={{padding:'8px 16px',border:'1.5px solid '+(tab===t?'#5b5ea6':'var(--border)'),borderRadius:10,background:tab===t?'#5b5ea6':'transparent',color:tab===t?'white':'var(--sub)',cursor:'pointer',fontFamily:'inherit',fontSize:'.78rem',fontWeight:500}}>{t}</button>
    )})}
    <button onClick={function(){setSortBy(function(s){return s==='chance'?'name':s==='name'?'sat':'chance'})}} style={{padding:'8px 14px',border:'1.5px solid var(--border)',borderRadius:10,background:'transparent',cursor:'pointer',fontFamily:'inherit',fontSize:'.78rem',color:'var(--sub)'}}>Sort: {sortBy==='chance'?'% Chance':sortBy==='name'?'Name':'SAT'} ↕</button>
  </div>

  <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(340px,1fr))',gap:12}}>
    {filtered.slice(0,showCount).map(function(c,i){
      var selMajor=selectedMajors[c.name];
      var majorData=selMajor?getMajorsForSchool(c).find(function(m){return m.name===selMajor}):null;
      var dispChance=majorData?adjustChanceForMajor(c.chance,majorData.mult,c.sat):c.chance;
      var dispCat=getCat(dispChance);
      return(
      <div key={i} className="college-card" style={{flexDirection:'column',gap:8,cursor:'pointer'}}>
        <div style={{display:'flex',gap:14,alignItems:'center'}} onClick={function(){setSelectedCollege(c)}}>
          <button onClick={function(e){e.stopPropagation();toggleWL(c.name)}} style={{position:'absolute',top:8,right:8,background:'none',border:'none',cursor:'pointer',fontSize:'.9rem',zIndex:2,opacity:watchlist[c.name]?1:.3,filter:watchlist[c.name]?'none':'grayscale(1)'}}>★</button>
          <Logo name={c.name} size={44}/>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontWeight:600,fontSize:'.85rem',lineHeight:1.3,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',paddingRight:24}} title={c.name}>{c.name}</div>
            <div style={{fontSize:'.7rem',color:'var(--sub)',marginTop:1}}>{c.priv?'Private':'Public'} · SAT {c.sat} · GPA {c.gpa}</div>
          </div>
          <div style={{textAlign:'right',flexShrink:0}}>
            <div style={{fontSize:'1.35rem',fontWeight:700,lineHeight:1,color:dispCat.c}}>{dispChance}<span style={{fontSize:'.7rem'}}>%</span></div>
            <div style={{display:'inline-block',padding:'2px 8px',borderRadius:6,fontSize:'.66rem',fontWeight:600,marginTop:2,background:dark?dispCat.c+'20':dispCat.bg,color:dispCat.c}}>{dispCat.l}</div>
          </div>
        </div>
        <select value={selMajor||""} onClick={function(e){e.stopPropagation()}} onChange={function(e){setSelectedMajors(function(p){var n=Object.assign({},p);if(e.target.value)n[c.name]=e.target.value;else delete n[c.name];return n})}} style={{width:'100%',padding:'6px 10px',border:'1px solid var(--border)',borderRadius:8,fontSize:'.72rem',fontFamily:'inherit',background:dark?'rgba(255,255,255,0.05)':'rgba(0,0,0,0.02)',color:'inherit',cursor:'pointer',outline:'none'}}>
          <option value="">Select major (overall rate)</option>
          {["STEM","Engineering","Science","Business","Health","Social Sci","Humanities","Comm","Arts","Education","General"].map(function(cat){
            var items=MAJORS.filter(function(m){return m[1]===cat});
            if(!items.length)return null;
            return <optgroup key={cat} label={cat}>{items.map(function(m){
              var schoolData=SCHOOL_MAJORS[c.name];
              var isSpecific=schoolData&&schoolData[m[0]];
              return <option key={m[0]} value={m[0]}>{m[0]}{isSpecific?" ★":""}</option>
            })}</optgroup>
          })}
        </select>
        {majorData&&<div style={{fontSize:'.68rem',color:majorData.mult<=0.65?'#ef4444':majorData.mult<=0.85?'#f59e0b':'var(--sub)',lineHeight:1.4,padding:'0 2px'}}>
          {majorData.isSpecific?"★ ":""}{getMajorExplanation(selMajor,majorData.mult,majorData.isSpecific,c.name)}
        </div>}
      </div>
    )})}
  </div>

  {filtered.length>showCount&&<button onClick={function(){setShowCount(function(p){return p+30})}} style={{width:'100%',padding:'14px',border:'2px dashed var(--border)',borderRadius:14,background:'transparent',cursor:'pointer',fontFamily:'inherit',color:'var(--sub)',fontSize:'.9rem',marginTop:14}}>Show more ({filtered.length-showCount} remaining)</button>}

  <p style={{textAlign:'center',padding:'36px 0 16px',color:'var(--sub)',fontSize:'.75rem',maxWidth:600,margin:'0 auto',lineHeight:1.6}}>
    Percentages are statistical estimates based on profile matching and school-specific criteria weighting.{testOptional?' Test-optional applicants may see lower chances at highly selective schools.':''} Admissions involve many factors this model cannot fully capture.
  </p>
</div>
)}

{/* ═══════ COLLEGE DETAIL MODAL ═══════ */}
{selectedCollege&&(function(){var c=selectedCollege;var w=c.weights||{};
  var selLabel=c.sat>=1500?'Ultra-Selective':c.sat>=1400?'Highly Selective':c.sat>=1300?'Selective':c.sat>=1200?'Moderately Selective':c.sat>=1100?'Less Selective':'Open Admission';
  var bars=[['Academics',c.acadScore,w.wAcad,'#6366f1'],['Extracurriculars',c.ecScore,w.wEC,'#8b5cf6'],['Essay',c.essScore,w.wEssay,'#e07a5f'],['Coursework',c.courseScore,w.wCourse,'#3b82f6'],['Soft Factors',c.softScore,w.wSoft,'#10b981'],['Recommendation',c.lorScore,w.wLor,'#f59e0b']];
  var selMajor=selectedMajors[c.name];
  var schoolMajors=getMajorsForSchool(c);
  var majorData=selMajor?schoolMajors.find(function(m){return m.name===selMajor}):null;
  var dispChance=majorData?adjustChanceForMajor(c.chance,majorData.mult,c.sat):c.chance;
  var dispCat=getCat(dispChance);
  return <div onClick={function(){setSelectedCollege(null)}} style={{position:'fixed',inset:0,zIndex:200,background:'rgba(0,0,0,0.5)',backdropFilter:'blur(6px)',display:'flex',alignItems:'center',justifyContent:'center',padding:20}}>
    <div onClick={function(e){e.stopPropagation()}} style={{background:dark?'#16162e':'#fff',borderRadius:24,maxWidth:580,width:'100%',maxHeight:'90vh',overflow:'auto',boxShadow:'0 24px 80px rgba(0,0,0,0.3)',position:'relative'}}>
      <button onClick={function(){setSelectedCollege(null)}} style={{position:'absolute',top:16,right:16,background:'none',border:'none',fontSize:'1.3rem',cursor:'pointer',color:'var(--sub)',zIndex:3}}>✕</button>
      <div style={{padding:'28px 28px 0',display:'flex',gap:16,alignItems:'center'}}>
        <Logo name={c.name} size={64}/>
        <div>
          <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:'1.3rem',lineHeight:1.2,marginBottom:4}}>{c.name}</h2>
          <div style={{fontSize:'.82rem',color:'var(--sub)'}}>{c.priv?'Private':'Public'} · {selLabel}</div>
        </div>
      </div>

      {/* Chance display */}
      <div style={{textAlign:'center',padding:'20px 28px 8px'}}>
        <div style={{fontSize:'3rem',fontWeight:800,color:dispCat.c,lineHeight:1}}>{dispChance}<span style={{fontSize:'1.1rem'}}>%</span></div>
        <div style={{display:'inline-block',padding:'4px 16px',borderRadius:8,fontSize:'.82rem',fontWeight:600,marginTop:6,background:dark?dispCat.c+'20':dispCat.bg,color:dispCat.c}}>{dispCat.l}</div>
        {majorData&&<div style={{fontSize:'.75rem',color:'var(--sub)',marginTop:4}}>Overall: {c.chance}% → With {selMajor}: {dispChance}%</div>}
      </div>

      {/* Major selector */}
      <div style={{padding:'12px 28px 8px'}}>
        <label style={{fontSize:'.78rem',fontWeight:600,display:'block',marginBottom:6,textTransform:'uppercase',letterSpacing:.5,color:'var(--sub)'}}>Intended Major</label>
        <select value={selMajor||""} onChange={function(e){setSelectedMajors(function(p){var n=Object.assign({},p);if(e.target.value)n[c.name]=e.target.value;else delete n[c.name];return n})}} style={{width:'100%',padding:'10px 14px',border:'1.5px solid var(--border)',borderRadius:12,fontSize:'.88rem',fontFamily:'inherit',background:dark?'rgba(255,255,255,0.05)':'rgba(0,0,0,0.02)',color:'inherit',cursor:'pointer',outline:'none'}}>
          <option value="">Select a major (using overall rate)</option>
          {["STEM","Engineering","Science","Business","Health","Social Sci","Humanities","Comm","Arts","Education","General"].map(function(cat){
            var items=MAJORS.filter(function(m){return m[1]===cat});
            if(!items.length)return null;
            return <optgroup key={cat} label={cat}>{items.map(function(m){
              var isSpecific=SCHOOL_MAJORS[c.name]&&SCHOOL_MAJORS[c.name][m[0]];
              return <option key={m[0]} value={m[0]}>{m[0]}{isSpecific?" ★":""}</option>
            })}</optgroup>
          })}
        </select>
        {majorData&&<div style={{marginTop:8,padding:'10px 14px',borderRadius:10,fontSize:'.8rem',lineHeight:1.5,background:majorData.mult<=0.65?(dark?'rgba(239,68,68,0.1)':'#fef2f2'):majorData.mult<=0.85?(dark?'rgba(245,158,11,0.1)':'#fffbeb'):(dark?'rgba(255,255,255,0.03)':'#f8f8f6'),color:majorData.mult<=0.65?'#dc2626':majorData.mult<=0.85?'#d97706':'var(--sub)',border:'1px solid '+(majorData.mult<=0.65?'rgba(239,68,68,0.2)':majorData.mult<=0.85?'rgba(245,158,11,0.2)':'var(--border)')}}>
          {majorData.isSpecific&&<span style={{fontWeight:700}}>★ School-specific data: </span>}
          {getMajorExplanation(selMajor,majorData.mult,majorData.isSpecific,c.name)}
          {!majorData.isSpecific&&<span style={{display:'block',marginTop:4,fontSize:'.72rem',fontStyle:'italic',opacity:.8}}>Estimate based on national trends — this school may not publish major-specific rates.</span>}
        </div>}
      </div>

      {/* School stats */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8,padding:'12px 28px'}}>
        {[['Avg SAT',c.sat],['Avg GPA',c.gpa],['Avg ACT',c.act||'N/A']].map(function(arr){return(
          <div key={arr[0]} style={{padding:'10px 14px',borderRadius:12,background:dark?'rgba(255,255,255,0.04)':'#f8f8f6',textAlign:'center'}}>
            <div style={{fontSize:'.7rem',color:'var(--sub)',textTransform:'uppercase',letterSpacing:.5}}>{arr[0]}</div>
            <div style={{fontSize:'1.05rem',fontWeight:700,marginTop:2}}>{arr[1]}</div>
          </div>
        )})}
      </div>

      {/* Score breakdown */}
      <div style={{padding:'8px 28px 16px'}}>
        <div style={{fontSize:'.78rem',fontWeight:600,marginBottom:8,textTransform:'uppercase',letterSpacing:.5,color:'var(--sub)'}}>Score Breakdown</div>
        {bars.map(function(arr){var label=arr[0],score=arr[1]||0,weight=arr[2]||0,color=arr[3];return(
          <div key={label} style={{marginBottom:6}}>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:'.76rem',marginBottom:2}}>
              <span>{label}</span>
              <span style={{color:'var(--sub)'}}>{Math.round(score)}/100 · {Math.round(weight*100)}%</span>
            </div>
            <div style={{height:6,borderRadius:3,background:dark?'rgba(255,255,255,0.06)':'#eee'}}>
              <div style={{height:'100%',borderRadius:3,background:color,width:Math.round(score)+'%',transition:'width .5s'}}/>
            </div>
          </div>
        )})}
      </div>

      {/* Watchlist */}
      <div style={{padding:'0 28px 24px'}}>
        <button onClick={function(){toggleWL(c.name)}} style={{width:'100%',padding:'12px',border:'1.5px solid '+(watchlist[c.name]?'#e07a5f':'var(--border)'),borderRadius:14,background:watchlist[c.name]?(dark?'rgba(224,122,95,0.15)':'#fef2f2'):'transparent',color:watchlist[c.name]?'#e07a5f':dark?'#ccc':'#444',cursor:'pointer',fontFamily:'inherit',fontSize:'.9rem',fontWeight:600}}>
          {watchlist[c.name]?'★ Remove from Watchlist':'☆ Add to Watchlist'}
        </button>
      </div>
    </div>
  </div>})()}

</div>);
}
