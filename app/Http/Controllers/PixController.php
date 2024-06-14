<?php

namespace App\Http\Controllers;

class PixController
{
    private String $pixKey = 'dd4c05cb-189e-4fd0-80e9-11cf2dc274f3';

    function formataCampo($id, $value)
    {
        $size = str_pad(strlen($value), 2, '0', STR_PAD_LEFT);
        return $id . $size . $value;
    }

    function montaPayload($description, $amount, $merchantName, $merchantCity, $referenceLabel)
    {
        $payload = '';

        // Payload Format Indicator
        $payload .= $this->formataCampo('00', '01');

        // Merchant Account Information
        $merchantAccountInfo = '';
        $merchantAccountInfo .=  $this->formataCampo('00', 'BR.GOV.BCB.PIX');
        $merchantAccountInfo .=  $this->formataCampo('01', $this->pixKey);
        if (!empty($description)) {
            $merchantAccountInfo .=  $this->formataCampo('02', $description);
        }
        $payload .=  $this->formataCampo('26', $merchantAccountInfo);

        // Merchant Category Code
        $payload .=  $this->formataCampo('52', '0000');

        // Transaction Currency
        $payload .=  $this->formataCampo('53', '986');

        // Transaction Amount
        if (!empty($amount)) {
            $payload .=  $this->formataCampo('54', number_format($amount, 2, '.', ''));
        }

        // Country Code
        $payload .=  $this->formataCampo('58', 'BR');

        // Merchant Name
        $payload .=  $this->formataCampo('59', $merchantName);

        // Merchant City
        $payload .=  $this->formataCampo('60', $merchantCity);

        // Additional Data Field Template
        if (!empty($referenceLabel)) {
            $additionalDataField =  $this->formataCampo('05', $referenceLabel);
            $payload .=  $this->formataCampo('62', $additionalDataField);
        }

        // CRC
        $payload .= '6304'; // Placeholder for CRC

        return $payload . $this->crc16($payload);
    }

    function crc16($data)
    {
        $crc = 0xFFFF;
        $polynomial = 0x1021;

        for ($i = 0; $i < strlen($data); $i++) {
            $byte = ord($data[$i]);
            $crc ^= ($byte << 8);

            for ($j = 0; $j < 8; $j++) {
                if (($crc & 0x8000) != 0) {
                    $crc = ($crc << 1) ^ $polynomial;
                } else {
                    $crc = $crc << 1;
                }
            }
        }

        $crc &= 0xFFFF;
        return strtoupper(dechex($crc));
    }
}
