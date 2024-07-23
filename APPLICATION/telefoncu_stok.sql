-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1
-- Üretim Zamanı: 23 Tem 2024, 13:42:06
-- Sunucu sürümü: 10.4.32-MariaDB
-- PHP Sürümü: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `telefoncu_stok`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `telefon_admin`
--

CREATE TABLE `telefon_admin` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `passwd` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `telefon_admin`
--

INSERT INTO `telefon_admin` (`id`, `username`, `passwd`) VALUES
(1, 'Admin', 'asdasd123');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `telefon_modelleri`
--

CREATE TABLE `telefon_modelleri` (
  `id` int(11) NOT NULL,
  `marka` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  `renk` varchar(50) DEFAULT NULL,
  `depolama` varchar(20) DEFAULT NULL,
  `ram` varchar(20) DEFAULT NULL,
  `fiyat` int(11) NOT NULL DEFAULT 0,
  `stok_miktari` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `telefon_modelleri`
--

INSERT INTO `telefon_modelleri` (`id`, `marka`, `model`, `renk`, `depolama`, `ram`, `fiyat`, `stok_miktari`) VALUES
(1, 'iPhone', '15 PRO MAX', 'GOLD', '256 GB', '8', 72000, 19),
(2, 'Samsung', 'Galaxy S23 Ultra', 'BORDO', '256 GB', '8', 46000, 20);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `telefon_satislari`
--

CREATE TABLE `telefon_satislari` (
  `id` int(11) NOT NULL,
  `marka` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  `renk` varchar(50) DEFAULT NULL,
  `depolama` varchar(20) DEFAULT NULL,
  `ram` varchar(20) DEFAULT NULL,
  `fiyat` int(11) NOT NULL DEFAULT 0,
  `ad` varchar(100) NOT NULL,
  `soyad` varchar(100) NOT NULL,
  `tc` varchar(100) NOT NULL,
  `tarih` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `telefon_satislari`
--

INSERT INTO `telefon_satislari` (`id`, `marka`, `model`, `renk`, `depolama`, `ram`, `fiyat`, `ad`, `soyad`, `tc`, `tarih`) VALUES
(1, 'iPhone', '15 PRO MAX', 'GOLD', '256 GB', '8', 72000, 'SEMİH', 'SAYĞIN', '10370401512', '2024-06-27 03:53:56');

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `telefon_admin`
--
ALTER TABLE `telefon_admin`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `telefon_modelleri`
--
ALTER TABLE `telefon_modelleri`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `telefon_satislari`
--
ALTER TABLE `telefon_satislari`
  ADD PRIMARY KEY (`id`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `telefon_admin`
--
ALTER TABLE `telefon_admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Tablo için AUTO_INCREMENT değeri `telefon_modelleri`
--
ALTER TABLE `telefon_modelleri`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Tablo için AUTO_INCREMENT değeri `telefon_satislari`
--
ALTER TABLE `telefon_satislari`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
