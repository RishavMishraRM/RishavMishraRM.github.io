$path = "temp_cv\extracted\word\document.xml"
$xml = [xml](Get-Content $path)
$ns = New-Object System.Xml.XmlNamespaceManager($xml.NameTable)
$ns.AddNamespace("w", "http://schemas.openxmlformats.org/wordprocessingml/2006/main")
$nodes = $xml.SelectNodes("//w:t", $ns)
$text = $nodes | ForEach-Object { $_.InnerText }
$text -join " " | Out-File -FilePath "cv_text.txt" -Encoding utf8
