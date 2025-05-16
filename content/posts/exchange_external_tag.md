---
title: "Exchange Online: Tagging External Emails with Powershell"
date: 2025-03-12
summary: "A simple PowerShell-based approach to visibly tagging external emails in Exchange Online."
type: post
tags: ["exchange", "powershell", "security", "tech"]
cover:
  image: "/images/ms-outlook-logo.jpg"
  alt: "Exchange External Tag"
  relative: false
  hiddenInList: false
  hiddenInSingle: false
  responsiveImages: true
draft: false
---

------------

Want to add a visual warning banner to emails from outside your organisation? This quick PowerShell script does exactly that. Tagging external emails in Exchange Online with a bold disclaimer to help users spot potential phishing attempts.

---

## What This Script Does

* Turns on native external tagging in Outlook and OWA.
* Creates a transport rule that adds a bright HTML warning banner to all external emails.
* Double-checks that the tagging is enabled, and enables it if not.

---

## Step-by-Step Breakdown

### 1. Connect to Exchange Online

```powershell
Connect-ExchangeOnline
```

### 2. Enable External Tagging in Outlook

```powershell
Set-ExternalInOutlook -Enabled $true
```

Enables Microsoft's built-in external email notification across Outlook and OWA.

### 3. Add a Visual Disclaimer for External Emails

```powershell
$disclaimer = @"
<table border='5' bgcolor='#e80d27' style='background-color: #e80d27; border-style: solid; border-color: #000000;'>
  <tbody>
    <tr style='height: 45px;'>
      <td style='height: 45px;'>
        <span style='color: #f9f9f9;'>
          <strong>THIS IS AN EXTERNAL EMAIL:</strong> If you weren't expecting this, don't click links or open attachments. Contact your IT team.
        </span>
      </td>
    </tr>
  </tbody>
</table>
"@

New-TransportRule -Name "External Email Tag" `
  -FromScope NotInOrganization `
  -ApplyHtmlDisclaimerLocation Prepend `
  -ApplyHtmlDisclaimerText $disclaimer `
  -ApplyHtmlDisclaimerFallbackAction Wrap
```

### 4. Check If Tagging Is Active (and Enable If Needed)

```powershell
$externalTagSetting = Get-ExternalInOutlook

if ($externalTagSetting.Enabled -eq $true) {
    Write-Host "External tag is already enabled." -ForegroundColor Green
} else {
    Write-Host "External tag is DISABLED. Enabling..." -ForegroundColor Yellow
    Set-ExternalInOutlook -Enabled $true

    $check = Get-ExternalInOutlook
    if ($check.Enabled -eq $true) {
        Write-Host "Successfully enabled external email tag." -ForegroundColor Green
    } else {
        Write-Host "Failed to enable external email tag. Check permissions." -ForegroundColor Red
    }
}
```

### 5. Disconnect When Done

```powershell
Disconnect-ExchangeOnline -Confirm:$false
```

---

## Tips & Notes

* You can split the script into stages if needed—connect first, then create rule, then validate.
* Only external, unauthenticated senders get tagged—internal mail is untouched.
* Customize the disclaimer colors and wording to match your brand.

---

## Wrapping Up

This is a quick win for mail hygiene—especially useful in environments where users might not think twice about a suspicious email. A visual cue helps them pause before they click.
