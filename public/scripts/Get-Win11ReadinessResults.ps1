$PassReport         = @()
$FailReport         = @()
$UndeterminedReport = @()

$computers = Get-ADComputer -Filter 'Enabled -eq $true' -Properties Info,OperatingSystem | Where-Object { $_.Info -match '"returnCode":' }

foreach ($computer in $computers) {
    $jsonString = $computer.Info
    $object = $jsonString | ConvertFrom-Json

    if ($computer.OperatingSystem) {
        $osName = $computer.OperatingSystem
    } else {
        $osName = "Unknown"
    }

    $logItems = ($object.logging -split ';') | ForEach-Object { $_.Trim() }
    $failures = $logItems | Where-Object { $_ -match 'FAIL' }

    switch ($object.returnCode) {
        0 {
            $PassReport += [PSCustomObject]@{
                Computer = $computer.Name
                OS       = $osName
                Status   = "PASS"
            }
        }
        1 {
            $FailReport += [PSCustomObject]@{
                Computer = $computer.Name
                OS       = $osName
                Status   = if ($failures) { $failures -join '; ' } else { "No specific failure logged" }
            }
        }
        -1 {
            $UndeterminedReport += [PSCustomObject]@{
                Computer = $computer.Name
                OS       = $osName
                Status   = if ($object.returnResult) { "Undetermined: $($object.returnResult -replace '\s+', ' ')" } else { "Undetermined reason not captured" }
            }
        }
    }
}

Write-Host "`n===== Incompatible Machines =====" -ForegroundColor Red
$FailReport | Format-Table -AutoSize

Write-Host "`n===== Compatible Machines =====" -ForegroundColor Green
$PassReport | Format-Table -AutoSize

Write-Host "`n===== ⚠️ Undetermined Machines =====" -ForegroundColor Yellow
$UndeterminedReport | Format-Table -AutoSize
