-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: sql.endora.cz:3310
-- Generation Time: Jun 06, 2021 at 08:38 AM
-- Server version: 5.6.45-86.1
-- PHP Version: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kcs`
--

-- --------------------------------------------------------

--
-- Table structure for table `hills`
--

CREATE TABLE `hills` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `elevation` int(5) NOT NULL,
  `lat` float NOT NULL,
  `lon` float NOT NULL,
  `prominence` int(5) NOT NULL,
  `isolation` varchar(255) NOT NULL,
  `material` varchar(255) NOT NULL,
  `basin` varchar(255) NOT NULL,
  `district` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hills`
--

INSERT INTO `hills` (`id`, `name`, `elevation`, `lat`, `lon`, `prominence`, `isolation`, `material`, `basin`, `district`, `location`) VALUES
(1, 'Milešovka', 837, 50.555, 13.9317, 620, '20km → Stropník, Krušné hory', 'znělec', '', 'Litoměřice', 'Velemín, Milešov'),
(2, 'Hradišťany', 752, 50.5075, 13.87, 235, '6.7km → Milešovka', 'nefelinit, trachyt', 'Labe', 'Teplice', 'Mukov'),
(3, 'Pařez', 736, 50.5464, 13.8783, 219, '3.7 km → Milešovka', 'trachyt', 'Labe', 'Teplice', 'Kostomlaty pod Milešovkou'),
(4, 'Sedlo', 726, 50.5931, 14.2639, 416, '23.6km → Milešovka', 'čedič, znělec', 'Labe', 'Litoměřice', 'Liběšice'),
(5, 'Kleč', 721, 50.5478, 13.8861, 45, '0.5km → Pařez', 'nefelinit', 'Labe', 'Teplice', 'Kostomlaty pod Milešovkou'),
(6, 'Ostrý (Červený újezd)', 719, 50.4972, 13.86, 65, '1.1km → Hradišťany', 'čedič', 'Bílina, Ohře', 'Teplice', 'Červený újezd'),
(7, 'Kletečná', 706, 50.5672, 13.9728, 234, '3km → Milešovka', 'trachyt', 'Labe', 'Litoměřice', 'Velemín'),
(8, 'Lipská hora', 689, 50.5128, 13.9131, 151, '2.8km → Hradišťany', 'trachyt', 'Labe', 'Litoměřice', 'Mrsklesy'),
(9, 'Buková hora', 683, 50.6717, 14.2278, 238, '8.5km → Sedlo', 'tefrit', 'Labe', 'Ústí nad Labem', 'Zubrnice'),
(10, 'Kočičí vrch', 679, 50.6831, 14.2517, 51, '2.1km → Buková hora', '', '', 'Děčín', 'Verneřice'),
(11, 'Hlaváč', 679, 50.5364, 13.8997, 26, '0.5km → Kleč', '', '', 'Litoměřice', 'Velemín'),
(12, 'Vrchovina', 677, 50.5939, 14.1403, 219, '8.6km → Sedlo', '', 'Labe', 'Litoměřice', 'Litoměřice'),
(13, 'Kukla', 674, 50.6222, 14.1275, 107, '3.2km → Vrchovina', '', '', 'Ústí nad Labem', 'Malečov'),
(14, 'Milešovský Kloc', 674, 50.5394, 13.9153, 80, '1.1km → Kleč', 'trachyt', 'Labe', 'Litoměřice', 'Milešov'),
(15, 'Trpasličí kameny', 671, 50.6228, 14.1131, 23, '0.9km → Kukla', '', '', 'Ústí nad Labem', 'Malečov'),
(16, 'Táhlina', 670, 50.5231, 13.9017, 106, '1.4km → Lipská hora', '', '', 'Litoměřice', 'Velemín'),
(17, 'Matrelík', 668, 50.6625, 14.2494, 25, '1.7km → Buková hora', '', '', 'Děčín', 'Verneřice'),
(18, 'Zpěvný vrch', 660, 50.6794, 14.2386, 23, '0.8km → Kočičí vrch', '', '', 'Děčín', 'Verneřice'),
(19, 'Mravenčí vrch', 660, 50.5356, 13.8914, 22, '0.4km → Kleč', '', '', 'Teplice', 'Lukov'),
(20, 'Široký vrch', 659, 50.6275, 14.1058, 36, '0.6km → Trpasličí kameny', '', '', 'Ústí nad Labem', 'Malečov'),
(21, 'Kamenný vrch', 656, 50.6136, 14.1169, 28, '0.9km → Trpasličí kameny', '', '', 'Ústí nad Labem', 'Malečov'),
(22, 'Dlouhý vrch (Lbín)', 655, 50.5814, 14.1492, 25, '0.8km → Vrchovina', 'augitit, tufy', 'Labe', 'Litoměřice', 'Lbín'),
(23, 'Zvon', 653, 50.5594, 13.9036, 95, '1.0km → Kleč', 'trachyt', 'Labe', 'Teplice', 'Černčice u Žalan'),
(24, 'Medvědí hůrka', 645, 50.7969, 14.5344, 67, '1.3km → Malý Buk', 'znělec', 'Ploučnice, Kamenice', 'Česká Lípa', 'Polevsko'),
(25, 'Klučky', 642, 50.7806, 14.5089, 50, '2.5km → Medvědí hůrka', 'čedič', 'Ploučnice', 'Česká Lípa', 'Prácheň, Polevsko'),
(26, 'Vlčí hora', 641, 50.7567, 14.4806, 73, '3.3km → Klučky', 'čedič', 'Ploučnice, Kamenice → Labe', 'Česká Lípa', 'Kamenický Šenov'),
(27, 'Varhošť', 639, 50.5903, 14.1006, 93, '2.4km → Vrchovina', 'nefelinit', 'Labe', 'Ústí nad Labem', 'Sebuzín, Hlinná, Čeřeniště'),
(28, 'Solanská hora', 638, 50.4931, 13.9033, 125, '2.2km → Lipská hora', 'nefelinit, limburgit, brekcie', 'Ohře', 'Litoměřice', 'Skalice'),
(29, 'Kupa', 635, 50.5958, 14.115, 27, '1.0km → Vrchovina', '', '', 'Ústí nad Labem', 'Čeřeniště'),
(30, 'Šenovský vrch', 632, 50.7828, 14.4814, 110, '1.9km → Klučky', 'čedič', '', 'Česká Lípa', 'Kamenický Šenov'),
(31, 'Babinský vrch', 630, 50.6039, 14.135, 62, '0.8km → Vrchovina', '', '', 'Ústí nad Labem', 'Čeřeniště'),
(32, 'Česká skála', 629, 50.76, 14.4967, 20, '0.9km → Vlčí hora', 'bazanit', 'Ploučnice', 'Česká Lípa', 'Prácheň u Kamenického Šenova'),
(33, 'Na Koruně', 627, 50.7017, 14.2822, 19, '2.3km → Kočičí vrch', '', '', 'Děčín', 'Heřmanov'),
(34, 'Modřín', 626, 50.6153, 14.1003, 59, '1.0km → Kamenný vrch', '', '', 'Ústí nad Labem', 'Němčí'),
(35, 'Polevský vrch', 626, 50.7917, 14.5253, 19, '0.4km → Medvědí hůrka', 'znělec', 'Ploučnice, Kamenice', 'Česká Lípa', 'Polevsko'),
(36, 'Stráž', 625, 50.6817, 14.2636, 17, '0.6m → Kočičí vrch', '', '', 'Děčín', 'Verneřice'),
(37, 'Dlouhý vrch (Podsedice)', 618, 50.4936, 13.9106, 30, '0.4km → Solanská hora', '', '', 'Litoměřice', 'Podsedice'),
(38, 'Javorský vrch', 617, 50.7317, 14.1144, 219, '5.9km → Děčínský Sněžník', '', 'Račí potok, Jílovský potok', 'Děčín', 'Javory'),
(39, 'Pákova hora', 617, 50.5103, 13.8956, 54, '1.1km → Lipská hora', '', '', 'Litoměřice', 'Velemín'),
(40, 'Setenka', 612, 50.5122, 13.9025, 34, '0.5km → Lipská hora', '', '', 'Litoměřice', 'Velemín'),
(41, 'Špičák (Žitenice)', 608, 50.5997, 14.145, 30, '0.2km → Vrchovina', '', '', 'Litoměřice', 'Žitenice'),
(42, 'Loučný', 606, 50.6733, 14.3364, 68, '4.5km → Stráž', '', '', 'Děčín ', 'Verneřice'),
(43, 'Čachnov', 605, 50.7556, 14.4711, 22, '0.4km → Vlčí hora', '', '', 'Česká Lípa', 'Slunečná'),
(44, 'Kamenná hora', 601, 50.6475, 14.1783, 143, '4.2km → Buková hora', '', '', 'Ústí nad Labem', 'Homole u Panny'),
(45, 'Strážný vrch', 601, 50.6872, 14.3556, 77, '2.0km → Loučný', 'čedič', 'Labe', 'Děčín', 'Merboltice'),
(46, 'Pohorský vrch', 601, 50.6456, 14.3275, 47, '3.0km → Loučný', '', '', 'Litoměřice', 'Úštěk'),
(47, 'Lovoš', 570, 50.5275, 14.0181, 258, '5.1km → Kletečná', 'olivinický nefelinit, trachyt', 'Labe', 'Litoměřice', 'Lovosice'),
(48, 'Vaňovský vrch', 561, 50.6144, 14.0594, 273, '2.5km → Modřín', '', 'Labe', 'Ústí nad Labem', 'Vaňov'),
(49, 'Bořeň', 539, 50.5278, 13.7639, 216, '5.9km → Hradišťany', 'znělec', '', 'Teplice', 'Bílina'),
(50, 'Oblík', 509, 50.4114, 13.8086, 216, '4.4km → Milá', 'bazanit', 'Ohře', 'Louny', 'Raná, Chraberce, Mnichov'),
(51, 'Zlatník', 521, 50.5161, 13.7147, 208, '3.7km → Bořeň', 'znělec', 'Bílina', 'Most', 'České Zlatníky'),
(52, 'Dobrná', 534, 50.7694, 14.3083, 206, '6.5km → Kohout', '', 'Ploučnice', 'Děčín', 'Dobrná'),
(53, 'Milá', 510, 50.4347, 13.7575, 200, '7.2km → Hradišťko', 'sodalit', 'Labe', 'Most', 'Bečov'),
(54, 'Raná', 457, 50.4069, 13.7711, 195, '2.5km → Oblík', 'čedič', 'Ohře', 'Louny', 'Raná'),
(55, 'Kozel', 598, 50.6639, 14.4561, 190, '7.5km → Strážný vrch', 'bazanit', 'Ploučnice', 'Česká Lípa', 'Kozly'),
(56, 'Dvorský kopec', 527, 50.7214, 14.4208, 174, '4.4km → Vlčí hora', '', '', 'Česká Lípa', 'Žandov'),
(57, 'Kaňkov', 436, 50.5375, 13.7258, 173, '2.0km → Želenický vrch', 'znělec', 'Labe', 'Most', 'Želenice'),
(58, 'Deblík', 459, 50.5847, 14.0536, 170, '2.3km → Varhošť', 'limburgit, bazanit', 'Labe', 'Litoměřice', 'Libochovany'),
(59, 'Ressl', 413, 50.5067, 13.6169, 169, '6.8km → Zlatník', 'znělec', 'Bílina', 'Most', 'Most'),
(60, 'Doubravská hora', 393, 50.6383, 13.8611, 155, '5.1km → Komáří hůrka', 'trachyt', 'Bílina', 'Teplice', 'Teplice'),
(61, 'Zámecký vrch', 541, 50.7917, 14.4333, 153, '1.5km → Smrčník', 'čedič', '', 'Děčín', 'Česká Kamenice'),
(62, 'Sutomský vrch', 505, 50.5072, 13.9775, 150, '3.6km → Lovoš', 'čedič', 'Labe', 'Litoměřice', 'Sutom'),
(63, 'Radečský kopec', 504, 50.7161, 14.4475, 136, '1.8km → Dvorský kopec', '', '', 'Česká Lípa', 'Volfartice'),
(64, 'Ve Chvojkách', 382, 50.6211, 13.8208, 133, '3.3km → Doubravská hora', '', '', 'Teplice', 'Teplice'),
(65, 'Vysoký kámen', 494, 50.6897, 14.1356, 131, '2.5km → Blansko', '', '', 'Ústí nad Labem', 'Povrly'),
(66, 'Panna', 593, 50.6117, 14.1847, 130, '3.1km → Vrchovina → Sedlo', 'augitit', 'Labe', 'Litoměřice', 'Řepčice'),
(67, 'Chmelník', 508, 50.7547, 14.1583, 130, '1.5km → Lotarův vrch', 'olivinický nefelinit', 'Labe', 'Děčín', 'Chmelnice'),
(68, 'Špičák (Most)', 399, 50.5197, 13.6678, 128, '3.1km → Zlatník', 'znělec', 'Bílina', 'Most', 'Most'),
(69, 'Lotarův vrch', 510, 50.7594, 14.1392, 127, '2.5km → Javorský vrch', 'čedič', 'Jílovský potok, Chrochvický potok, Račí potok', 'Děčín', 'Krásný Studenec'),
(70, 'Ostrý (Milešov)', 553, 50.5317, 13.9514, 120, '1.1km → Lhota → Kloc', 'čedič', 'Labe', 'Litoměřice', 'Milešov, Velemín, Kocourov'),
(71, 'Vysoký Ostrý', 587, 50.6364, 14.0803, 114, '1.7km → Široký vrch', 'bazanit', 'Labe', 'Ústí nad Labem', 'Střekov, Brná nad Labem'),
(72, 'Želenický vrch', 456, 50.5194, 13.7317, 113, '1.0km → Zlatník', 'znělec', 'Labe', 'Most', 'Želenice nad Bílinou'),
(73, 'Plešivec (Kamýk)', 509, 50.5653, 14.0894, 112, '1.8km → Hradiště', 'olivnický čedič', 'Labe', 'Litoměřice', 'Kamýk'),
(74, 'Střížovický vrch', 348, 50.6756, 14.0033, 112, '2.5km → Čepec', '', '', 'Ústí nad Labem', 'Ústí nad Labem'),
(75, 'Kohout', 589, 50.71, 14.3119, 111, '1.8km → Na Koruně', 'čedič', 'Labe', 'Děčín', 'Valkeřice'),
(77, 'Hněvín', 407, 50.5203, 13.6331, 110, '1.8km → Ressl', 'znělec', 'Bílina', 'Most', 'Most'),
(78, 'Srdov', 482, 50.4172, 13.8206, 109, '1km → Oblík', 'nefelinit', 'Ohře', 'Louny', 'Charvatce u Loun'),
(79, 'Trojhora', 456, 50.5919, 14.1908, 108, '1.6km → Kalich', 'limburgit, trachyt', 'Labe', 'Litoměřice', 'Třebušín'),
(80, 'Strážiště', 362, 50.5528, 14.0628, 108, '1.7km → Plešivec', '', '', 'Litoměřice', 'Velké Žernoseky'),
(81, 'Radešín', 550, 50.6972, 14.0594, 105, '4.5km → Javorský vrch', '', '', 'Ústí nad Labem', 'Chuderov'),
(82, 'Dlouhá', 483, 50.4528, 13.7958, 105, '3.3km → Milá', '', '', 'Louny', 'Libčeves'),
(83, 'Křížový vrch', 450, 50.4536, 13.8558, 104, '1.7km → Líska', '', '', 'Louny', 'Libčeves'),
(84, 'Lhota', 571, 50.5269, 13.9347, 103, '1.0km → Táhlina', '', '', 'Litoměřice', 'Třebenice'),
(85, 'Kubačka', 543, 50.5711, 14.0089, 103, '2.1km → Kletečná', 'bazanit', 'Labe', 'Litoměřice', 'Prackovice nad Labem'),
(86, 'Rovný', 377, 50.6297, 13.9775, 103, '8.1km → Doubravská hora', '', '', 'Ústí nad Labem', 'Řehlovice'),
(87, 'Popovičský vrch', 530, 50.7939, 14.2844, 101, '3km → Dobrná', 'pyroklastika, olivinický nefelinit', 'Labe', 'Děčín', 'Ludvíkovice, Huntířov'),
(88, 'Oltařík', 566, 50.4901, 13.9233, 74, '0,7 km → Solanská hora', 'tefrit', '', 'Litoměřice', 'Děkovka'),
(89, 'Ovčín', 431, 50.505, 14.0048, 0, '', 'čedič', 'Labe', 'Litoměřice', 'Vchynice'),
(91, 'Košťál', 481, 50.4902, 13.9847, 64, '1 km → Jezerka', 'trachybazalt, bazanit', '', 'Litoměřice', 'Třebenice'),
(92, 'Radobýl', 399, 50.5304, 14.0933, 85, '3,3 km → Plešivec', 'čedič', 'Labe', 'Litoměřice', 'Litoměřice'),
(93, 'Plešivec (Děkovka)', 477, 50.4912, 13.9388, 0, '', '', '', 'Litoměřice', 'Děkovka'),
(94, 'Kalich', 535, 50.605, 14.2067, 99, '1,6 km → Panna', 'trachyt', 'Labe', 'Litoměřice', 'Třebušín'),
(95, 'Děčínský Sněžník', 723, 50.7916, 14.1039, 151, '12,0 km → Jelení vrch', 'pískovec', 'Labe', 'Děčín', 'Děčín');

-- --------------------------------------------------------

--
-- Table structure for table `ids`
--

CREATE TABLE `ids` (
  `id` int(255) NOT NULL,
  `idKey` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ids`
--

INSERT INTO `ids` (`id`, `idKey`) VALUES
(23, '$2y$10$iTajhwDdY40Tp1JCaZpgVOSDEiCil/4yyAg71Um0h2d7kzPcctdgC'),
(22, '$2y$10$btZJPUmgbfn2p1sdYYI8V.dagCPtXaCvCluiD8c.nvw9/TUM4FC96'),
(21, '$2y$10$pvYott5aP2tJKg1QIz0gj.wFdxCwlhuWPmv/uHaei6ZST1KyJoxme'),
(24, '$2y$10$IZQRnF9X3bYiyBmlYO4zQ..4vLiMTyVzStYftgfBoXV0mFY7OqXN6'),
(25, '$2y$10$C6cIj5WdhMxhtTExvul0sOs8v.tevD5Yqz/EnIMgEQL5Ha7kM/Xzm'),
(27, '$2y$10$UL8S1CR3QZEc.QTX8Ja41Ort9htBjCKqpLSma5PaYebJitIahl0im'),
(26, '$2y$10$L5RO4lax2ONV0rhuk5TCG.3LpkmYCwlQPC3GPouUIcr6cNpZMk4.e'),
(29, '$2y$10$nVV1saKMzbCl.QG1Cvj4kutxKaM3h5r9DK7.VWLskpqlpxr74po0S'),
(30, '$2y$10$n9LvzcCi59B0WuI0TiTSS.R2f/tK6XKHEdbVkM.LIvlsxM8qQ7GvK'),
(31, '$2y$10$gyqioOUD/w7XRcUmkhaZneg8xOqGy3KRigrbdc/f9oxUVrxXjpe3O');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `login` char(60) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `wasHere` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `login`, `pass`, `wasHere`) VALUES
(26, 'test', '$argon2id$v=19$m=65536,t=4,p=1$8IcMn4aCVZTou0SvzOyxew$E5B1s6gEPVPjOU511xWI34pfGSDMaRdPF+owOW9I/3M', ' 22, 0.3763486067733135, 79, 47, 67,'),
(24, 'kubat', '$argon2id$v=19$m=65536,t=4,p=1$Sv7OV6Ex61ydqh7nco1kxw$MW0aVi7JrGB83DDTffrYfVYGsyIIYIYmWSkKarNIV1U', ' 0.5296870031929242, 46, 6, 84, 7, 72,'),
(27, 'Talarius', '$argon2id$v=19$m=65536,t=4,p=1$q1KtnNTwIXUvtZTLDirrgA$xdQeJFsRxgXcfBNuY7pRId6b37XlNNgZd/59tPKufhI', ''),
(28, 'Talarius', '$argon2id$v=19$m=65536,t=4,p=1$jRyoI7ReSG/pa1vaI+5/sA$G5D3HuP8p1jY1jgLJD6eXPFkq05DCGcayT6F0hhoqQo', ''),
(30, 'picus', '$argon2id$v=19$m=65536,t=4,p=1$8NS3B+rzvqI1to1IVL5twA$r8OrvkU1Amz5fNRyEUqBy0b3/VxhqKbVppmpBLZxASU', ' 0.4786344317412152, 22, 4,'),
(31, 'teo', '$argon2id$v=19$m=65536,t=4,p=1$ZnsB/EqdD1QFq3G8Ofco2Q$n9Rf79UXjLzvV7Zg0+YkgNKXwxN4X0vDlkcxy76rY0Q', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `hills`
--
ALTER TABLE `hills`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `hills`
--
ALTER TABLE `hills`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=96;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
