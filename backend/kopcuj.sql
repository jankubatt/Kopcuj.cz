-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 27, 2022 at 02:52 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kopcuj`
--

-- --------------------------------------------------------

--
-- Table structure for table `discussions`
--

CREATE TABLE `discussions` (
  `id` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `subject` varchar(50) NOT NULL,
  `text` text NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `discussions`
--

INSERT INTO `discussions` (`id`, `user`, `subject`, `text`, `created`) VALUES
(5, 3, 'ahoj', 'tohle je test', '2022-11-27 09:54:42'),
(6, 3, 'aaa', 'aaa', '2022-11-27 10:00:11'),
(7, 3, 'aaa', 'aaaddd', '2022-11-27 10:00:16');

-- --------------------------------------------------------

--
-- Table structure for table `discussions_replies`
--

CREATE TABLE `discussions_replies` (
  `id` int(11) NOT NULL,
  `discussion` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `created` int(11) NOT NULL DEFAULT current_timestamp(),
  `text` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `discussions_replies`
--

INSERT INTO `discussions_replies` (`id`, `discussion`, `user`, `created`, `text`) VALUES
(7, 7, 3, 2147483647, 'aaaaaa'),
(8, 7, 3, 2147483647, 'aaaa'),
(9, 7, 3, 2147483647, 'aha no'),
(10, 7, 3, 2147483647, 'lm'),
(11, 5, 3, 2147483647, 'Opravdu');

-- --------------------------------------------------------

--
-- Table structure for table `discussions_replies_downvotes`
--

CREATE TABLE `discussions_replies_downvotes` (
  `discussion` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `random` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `discussions_replies_upvotes`
--

CREATE TABLE `discussions_replies_upvotes` (
  `discussion` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `random` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `faults`
--

CREATE TABLE `faults` (
  `id` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `hill` int(11) NOT NULL,
  `text` text NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `faults`
--

INSERT INTO `faults` (`id`, `user`, `hill`, `text`, `created`) VALUES
(6, 3, 1, 'mrdko', '2022-11-27 13:38:18');

-- --------------------------------------------------------

--
-- Table structure for table `faults_likes`
--

CREATE TABLE `faults_likes` (
  `id` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `fault` int(11) NOT NULL,
  `random` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `hills`
--

CREATE TABLE `hills` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `elevation` int(5) NOT NULL,
  `lat` float NOT NULL,
  `lng` float NOT NULL,
  `prominence` int(5) NOT NULL,
  `isolation` varchar(255) NOT NULL,
  `material` varchar(255) NOT NULL,
  `basin` varchar(255) NOT NULL,
  `district` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hills`
--

INSERT INTO `hills` (`id`, `name`, `elevation`, `lat`, `lng`, `prominence`, `isolation`, `material`, `basin`, `district`, `location`) VALUES
(1, 'Milešovka', 837, 50.555, 13.9317, 620, '20km → Stropník, Krušné hory', 'znělec', '', 'Litoměřice', 'Velemín, Milešov'),
(2, 'Hradišťany', 752, 50.5075, 13.87, 235, '6.7km → Milešovka', 'nefelinit, trachyt', 'Labe', 'Teplice', 'Mukov'),
(3, 'Pařez', 736, 50.5464, 13.8783, 219, '3.7 km → Milešovka', 'trachyt', 'Labe', 'Teplice', 'Kostomlaty pod Milešovkou'),
(4, 'Sedlo', 726, 50.5931, 14.2639, 416, '23.6km → Milešovka', 'čedič, znělec', 'Labe', 'Litoměřice', 'Liběšice'),
(5, 'Kleč', 721, 50.5478, 13.8861, 45, '0.5km → Pařez', 'nefelinit', 'Labe', 'Teplice', 'Kostomlaty pod Milešovkou'),
(6, 'Ostrý', 719, 50.4972, 13.86, 65, '1.1km → Hradišťany', 'čedič', 'Bílina, Ohře', 'Teplice', 'Červený újezd'),
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
(22, 'Dlouhý vrch', 655, 50.5814, 14.1492, 25, '0.8km → Vrchovina', 'augitit, tufy', 'Labe', 'Litoměřice', 'Lbín'),
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
(37, 'Dlouhý vrch', 618, 50.4936, 13.9106, 30, '0.4km → Solanská hora', '', '', 'Litoměřice', 'Podsedice'),
(38, 'Javorský vrch', 617, 50.7317, 14.1144, 219, '5.9km → Děčínský Sněžník', '', 'Račí potok, Jílovský potok', 'Děčín', 'Javory'),
(39, 'Pákova hora', 617, 50.5103, 13.8956, 54, '1.1km → Lipská hora', '', '', 'Litoměřice', 'Velemín'),
(40, 'Setenka', 612, 50.5122, 13.9025, 34, '0.5km → Lipská hora', '', '', 'Litoměřice', 'Velemín'),
(41, 'Špičák', 608, 50.5997, 14.145, 30, '0.2km → Vrchovina', '', '', 'Litoměřice', 'Žitenice'),
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
(68, 'Špičák', 399, 50.5197, 13.6678, 128, '3.1km → Zlatník', 'znělec', 'Bílina', 'Most', 'Most'),
(69, 'Lotarův vrch', 510, 50.7594, 14.1392, 127, '2.5km → Javorský vrch', 'čedič', 'Jílovský potok, Chrochvický potok, Račí potok', 'Děčín', 'Krásný Studenec'),
(70, 'Ostrý', 553, 50.5317, 13.9514, 120, '1.1km → Lhota → Kloc', 'čedič', 'Labe', 'Litoměřice', 'Milešov, Velemín, Kocourov'),
(71, 'Vysoký Ostrý', 587, 50.6364, 14.0803, 114, '1.7km → Široký vrch', 'bazanit', 'Labe', 'Ústí nad Labem', 'Střekov, Brná nad Labem'),
(72, 'Želenický vrch', 456, 50.5194, 13.7317, 113, '1.0km → Zlatník', 'znělec', 'Labe', 'Most', 'Želenice nad Bílinou'),
(73, 'Plešivec', 509, 50.5653, 14.0894, 112, '1.8km → Hradiště', 'olivnický čedič', 'Labe', 'Litoměřice', 'Kamýk'),
(74, 'Střížovický vrch', 348, 50.6756, 14.0033, 112, '2.5km → Čepec', '', '', 'Ústí nad Labem', 'Ústí nad Labem'),
(75, 'Kohout', 589, 50.71, 14.3119, 111, '1.8km → Na Koruně', 'čedič', 'Labe', 'Děčín', 'Valkeřice'),
(76, 'Šenovský vrch', 632, 50.7828, 14.4814, 110, '1.9km → Klučky', 'čedič', '', 'Česká Lípa', 'Kamenický Šenov'),
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
(90, 'Košťál', 481, 50.4902, 13.9847, 64, '1 km → Jezerka', 'trachybazalt, bazanit', '', 'Litoměřice', 'Třebenice'),
(91, 'Radobýl', 399, 50.5304, 14.0933, 85, '3,3 km → Plešivec', 'čedič', 'Labe', 'Litoměřice', 'Litoměřice'),
(92, 'Plešivec', 477, 50.4912, 13.9388, 0, '', '', '', 'Litoměřice', 'Děkovka'),
(93, 'Kalich', 535, 50.605, 14.2067, 99, '1,6 km → Panna', 'trachyt', 'Labe', 'Litoměřice', 'Třebušín'),
(94, 'Děčínský Sněžník', 723, 50.7916, 14.1039, 151, '12,0 km → Jelení vrch', 'pískovec', 'Labe', 'Děčín', 'Děčín');

-- --------------------------------------------------------

--
-- Table structure for table `hills_attributes`
--

CREATE TABLE `hills_attributes` (
  `hill` int(11) NOT NULL,
  `difficulty` int(11) DEFAULT 0,
  `path` int(11) DEFAULT 0,
  `stroller` int(11) NOT NULL DEFAULT 0,
  `parking` int(11) NOT NULL DEFAULT 0,
  `food` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hills_attributes`
--

INSERT INTO `hills_attributes` (`hill`, `difficulty`, `path`, `stroller`, `parking`, `food`) VALUES
(1, 2, 2, 2, 2, 2),
(2, 0, 0, 0, 0, 0),
(3, 0, 0, 0, 0, 0),
(4, 0, 0, 0, 0, 0),
(5, 0, 0, 0, 0, 0),
(6, 0, 0, 0, 0, 0),
(7, 0, 0, 0, 0, 0),
(8, 0, 0, 0, 0, 0),
(9, 0, 0, 0, 0, 0),
(10, 0, 0, 0, 0, 0),
(11, 0, 0, 0, 0, 0),
(12, 0, 0, 0, 0, 0),
(13, 0, 0, 0, 0, 0),
(14, 0, 0, 0, 0, 0),
(15, 0, 0, 0, 0, 0),
(16, 0, 0, 0, 0, 0),
(17, 0, 0, 0, 0, 0),
(18, 0, 0, 0, 0, 0),
(19, 0, 0, 0, 0, 0),
(20, 0, 0, 0, 0, 0),
(21, 0, 0, 0, 0, 0),
(22, 0, 0, 0, 0, 0),
(23, 0, 0, 0, 0, 0),
(24, 0, 0, 0, 0, 0),
(25, 0, 0, 0, 0, 0),
(26, 0, 0, 0, 0, 0),
(27, 0, 0, 0, 0, 0),
(28, 0, 0, 0, 0, 0),
(29, 0, 0, 0, 0, 0),
(30, 0, 0, 0, 0, 0),
(31, 0, 0, 0, 0, 0),
(32, 0, 0, 0, 0, 0),
(33, 0, 0, 0, 0, 0),
(34, 0, 0, 0, 0, 0),
(35, 0, 0, 0, 0, 0),
(36, 0, 0, 0, 0, 0),
(37, 0, 0, 0, 0, 0),
(38, 0, 0, 0, 0, 0),
(39, 0, 0, 0, 0, 0),
(40, 0, 0, 0, 0, 0),
(41, 0, 0, 0, 0, 0),
(42, 0, 0, 0, 0, 0),
(43, 0, 0, 0, 0, 0),
(44, 0, 0, 0, 0, 0),
(45, 0, 0, 0, 0, 0),
(46, 0, 0, 0, 0, 0),
(47, 0, 0, 0, 0, 0),
(48, 0, 0, 0, 0, 0),
(49, 0, 0, 0, 0, 0),
(50, 0, 0, 0, 0, 0),
(51, 0, 0, 0, 0, 0),
(52, 0, 0, 0, 0, 0),
(53, 0, 0, 0, 0, 0),
(54, 0, 0, 0, 0, 0),
(55, 0, 0, 0, 0, 0),
(56, 0, 0, 0, 0, 0),
(57, 0, 0, 0, 0, 0),
(58, 0, 0, 0, 0, 0),
(59, 0, 0, 0, 0, 0),
(60, 0, 0, 0, 0, 0),
(61, 0, 0, 0, 0, 0),
(62, 0, 0, 0, 0, 0),
(63, 0, 0, 0, 0, 0),
(64, 0, 0, 0, 0, 0),
(65, 0, 0, 0, 0, 0),
(66, 0, 0, 0, 0, 0),
(67, 0, 0, 0, 0, 0),
(68, 0, 0, 0, 0, 0),
(69, 0, 0, 0, 0, 0),
(70, 0, 0, 0, 0, 0),
(71, 0, 0, 0, 0, 0),
(72, 0, 0, 0, 0, 0),
(73, 0, 0, 0, 0, 0),
(74, 0, 0, 0, 0, 0),
(75, 0, 0, 0, 0, 0),
(76, 0, 0, 0, 0, 0),
(77, 0, 0, 0, 0, 0),
(78, 0, 0, 0, 0, 0),
(79, 0, 0, 0, 0, 0),
(80, 0, 0, 0, 0, 0),
(81, 0, 0, 0, 0, 0),
(82, 0, 0, 0, 0, 0),
(83, 0, 0, 0, 0, 0),
(84, 0, 0, 0, 0, 0),
(85, 0, 0, 0, 0, 0),
(86, 0, 0, 0, 0, 0),
(87, 0, 0, 0, 0, 0),
(88, 0, 0, 0, 0, 0),
(89, 0, 0, 0, 0, 0),
(90, 0, 0, 0, 0, 0),
(91, 0, 0, 0, 0, 0),
(92, 0, 0, 0, 0, 0),
(93, 0, 0, 0, 0, 0),
(94, 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `hills_climbed`
--

CREATE TABLE `hills_climbed` (
  `id` int(11) NOT NULL,
  `hill` int(11) NOT NULL,
  `user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hills_climbed`
--

INSERT INTO `hills_climbed` (`id`, `hill`, `user`) VALUES
(2, 1, 3),
(3, 49, 4),
(4, 1, 4);

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `hill` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `added` timestamp NOT NULL DEFAULT current_timestamp(),
  `stars` int(11) NOT NULL,
  `text` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `hill`, `user`, `added`, `stars`, `text`) VALUES
(1, 1, 3, '2022-11-25 07:18:24', 2, 'aaaaa'),
(15, 1, 4, '2022-11-26 11:07:48', 1, 'fffff');

-- --------------------------------------------------------

--
-- Table structure for table `reviews_likes`
--

CREATE TABLE `reviews_likes` (
  `id` int(11) NOT NULL,
  `review` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `random` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `login` varchar(50) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `pass` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `authToken` varchar(255) DEFAULT NULL,
  `pfp` varchar(255) DEFAULT NULL,
  `theme` int(11) DEFAULT NULL,
  `registered` timestamp NOT NULL DEFAULT current_timestamp(),
  `lastLogin` timestamp NULL DEFAULT NULL,
  `forgotPassToken` varchar(255) DEFAULT NULL,
  `verifyToken` varchar(255) DEFAULT NULL,
  `isVerified` tinyint(1) NOT NULL DEFAULT 0,
  `isAdmin` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `login`, `name`, `pass`, `email`, `description`, `authToken`, `pfp`, `theme`, `registered`, `lastLogin`, `forgotPassToken`, `verifyToken`, `isVerified`, `isAdmin`) VALUES
(3, 'admin', 'MorpheusStathis', '$2b$10$sABad3z7gaU6CXaE6KuRruQO5431RMDvFPyoGXFuu8Vgjq251XlLq', 'jankubat77@gmail.com', NULL, 'ad8c6ca7-5348-45fb-b3dd-52a69c3d835e', NULL, NULL, '2022-11-25 07:01:02', '2022-11-27 12:22:31', NULL, '3d5a4e22-6380-402e-ad39-810a75e1b770', 1, 1),
(4, 'test', 'test', '$2b$10$7cFsSR3AQw.Uzf8K/iR6IOPsACsVKeyliDOnp14JiIrxE3KJnEfym', 'jankubat.1@seznam.cz', NULL, '3feca689-9364-4fa9-b645-b002a56c0859', NULL, NULL, '2022-11-26 06:47:54', '0000-00-00 00:00:00', NULL, '13ed2c63-8226-478b-b87f-5f513cf86510', 0, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `discussions`
--
ALTER TABLE `discussions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `discussions_user_fk` (`user`);

--
-- Indexes for table `discussions_replies`
--
ALTER TABLE `discussions_replies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `replies_discussion_fk` (`discussion`),
  ADD KEY `replies_user_fk` (`user`);

--
-- Indexes for table `discussions_replies_downvotes`
--
ALTER TABLE `discussions_replies_downvotes`
  ADD KEY `discussions_replies_downVotes_discussion` (`discussion`),
  ADD KEY `discussions_replies_downVotes_user` (`user`);

--
-- Indexes for table `discussions_replies_upvotes`
--
ALTER TABLE `discussions_replies_upvotes`
  ADD KEY `discussions_replies_upVotes_user` (`user`);

--
-- Indexes for table `faults`
--
ALTER TABLE `faults`
  ADD PRIMARY KEY (`id`),
  ADD KEY `faults_user_fk` (`user`),
  ADD KEY `faults_hill_fk` (`hill`);

--
-- Indexes for table `faults_likes`
--
ALTER TABLE `faults_likes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `faults_likes_fault_fk` (`fault`),
  ADD KEY `faults_likes_user_fk` (`user`);

--
-- Indexes for table `hills`
--
ALTER TABLE `hills`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hills_attributes`
--
ALTER TABLE `hills_attributes`
  ADD KEY `hills_attributes_hill_fk` (`hill`);

--
-- Indexes for table `hills_climbed`
--
ALTER TABLE `hills_climbed`
  ADD PRIMARY KEY (`id`),
  ADD KEY `hills_climbed_user_fk` (`user`),
  ADD KEY `hills_climbed_hill_fk` (`hill`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reviews_user_fk` (`user`),
  ADD KEY `reviews_hill_fk` (`hill`);

--
-- Indexes for table `reviews_likes`
--
ALTER TABLE `reviews_likes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `review_likes_user_fk` (`user`),
  ADD KEY `review_likes_review_fk` (`review`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `discussions`
--
ALTER TABLE `discussions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `discussions_replies`
--
ALTER TABLE `discussions_replies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `faults`
--
ALTER TABLE `faults`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `faults_likes`
--
ALTER TABLE `faults_likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `hills`
--
ALTER TABLE `hills`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;

--
-- AUTO_INCREMENT for table `hills_climbed`
--
ALTER TABLE `hills_climbed`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `reviews_likes`
--
ALTER TABLE `reviews_likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `discussions`
--
ALTER TABLE `discussions`
  ADD CONSTRAINT `discussions_user_fk` FOREIGN KEY (`user`) REFERENCES `users` (`id`);

--
-- Constraints for table `discussions_replies`
--
ALTER TABLE `discussions_replies`
  ADD CONSTRAINT `replies_discussion_fk` FOREIGN KEY (`discussion`) REFERENCES `discussions` (`id`),
  ADD CONSTRAINT `replies_user_fk` FOREIGN KEY (`user`) REFERENCES `users` (`id`);

--
-- Constraints for table `discussions_replies_downvotes`
--
ALTER TABLE `discussions_replies_downvotes`
  ADD CONSTRAINT `discussions_replies_downVotes_discussion` FOREIGN KEY (`discussion`) REFERENCES `discussions_replies` (`discussion`),
  ADD CONSTRAINT `discussions_replies_downVotes_user` FOREIGN KEY (`user`) REFERENCES `discussions_replies` (`user`);

--
-- Constraints for table `discussions_replies_upvotes`
--
ALTER TABLE `discussions_replies_upvotes`
  ADD CONSTRAINT `discussions_replies_upVotes_user` FOREIGN KEY (`user`) REFERENCES `discussions_replies` (`user`);

--
-- Constraints for table `faults`
--
ALTER TABLE `faults`
  ADD CONSTRAINT `faults_hill_fk` FOREIGN KEY (`hill`) REFERENCES `hills` (`id`),
  ADD CONSTRAINT `faults_user_fk` FOREIGN KEY (`user`) REFERENCES `users` (`id`);

--
-- Constraints for table `faults_likes`
--
ALTER TABLE `faults_likes`
  ADD CONSTRAINT `faults_likes_fault_fk` FOREIGN KEY (`fault`) REFERENCES `faults` (`id`),
  ADD CONSTRAINT `faults_likes_user_fk` FOREIGN KEY (`user`) REFERENCES `users` (`id`);

--
-- Constraints for table `hills_attributes`
--
ALTER TABLE `hills_attributes`
  ADD CONSTRAINT `hills_attributes_hill_fk` FOREIGN KEY (`hill`) REFERENCES `hills` (`id`);

--
-- Constraints for table `hills_climbed`
--
ALTER TABLE `hills_climbed`
  ADD CONSTRAINT `hills_climbed_hill_fk` FOREIGN KEY (`hill`) REFERENCES `hills` (`id`),
  ADD CONSTRAINT `hills_climbed_user_fk` FOREIGN KEY (`user`) REFERENCES `users` (`id`);

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_hill_fk` FOREIGN KEY (`hill`) REFERENCES `hills` (`id`),
  ADD CONSTRAINT `reviews_user_fk` FOREIGN KEY (`user`) REFERENCES `users` (`id`);

--
-- Constraints for table `reviews_likes`
--
ALTER TABLE `reviews_likes`
  ADD CONSTRAINT `review_likes_review_fk` FOREIGN KEY (`review`) REFERENCES `reviews` (`id`),
  ADD CONSTRAINT `review_likes_user_fk` FOREIGN KEY (`user`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
