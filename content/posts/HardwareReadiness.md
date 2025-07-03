---
title: "Windows 11 Readiness Reporting via PowerShell + Active Directory"
date: 2025-07-03
tags: ["sysyadmin", "tech", "powershell", "active directory"]
summary: "How to implement a domain-wide Windows 11 readiness audit using PowerShell and Active Directory to track compatibility across all machines."
type: post
cover:
  image: "/images/hardwarereadiness.jpg"
  alt: "AD & Powershell logo"
  relative: false
  hiddenInList: false
  hiddenInSingle: true
  responsiveImages: true
draft: false
---

## Introduction

With Microsoft’s announcement that Windows 10 will reach end of support in October 2025, we needed a reliable and scalable way to assess Windows 11 hardware compatibility across all domain-joined devices. While our RMM tools provide basic inventory data, they often fall short when it comes to delivering a clear, easily digestible view of which machines meet Windows 11 requirements and why others don’t.

As part of our response initiative, I researched how others were tackling the same challenge. The solution we implemented is a lightweight, AD-integrated compatibility check that logs results directly to each computer object in Active Directory. This approach not only centralises the data but also enables straightforward reporting and auditing without relying on third-party tools.

We operate in a Windows-based environment with Windows Server 2019 acting as our domain controller. This approach leverages native PowerShell cmdlets and Group Policy to roll out the assessment and retrieve results cleanly and efficiently.

We achieve this by:

- Running Microsoft's Windows 11 hardware compatibility assessment on all domain-joined computers  
- Storing the assessment results in Active Directory (`Info` attribute)  
- Generating categorised reports highlighting incompatibilities by device and reason (e.g. Storage, TPM, Secure Boot)

---

## Step 1: Deploy the Windows 11 Readiness Script

- Deploy the script (`HardwareReadiness.ps1`) via **Group Policy** as a **Startup Script**  
- No modification of the script is required  

> **Note:** The hardware readiness script is based on the official Microsoft version but has been **slightly modified** to store results in Active Directory via the `Info` attribute of the computer object.

### Script Behaviour

The script checks a range of Windows 11 compatibility criteria, including TPM version, Secure Boot, system memory, and storage size. Results are consolidated and stored in Active Directory.

#### Example Check Snippets

```powershell
$TPM_STRING = "TPM"
$TPM_VERSION_STRING = "TPMVersion"
$SECUREBOOT_STRING = "SecureBoot"

# TPM Check
$outObject.returnReason += $logFormatReturnReason -f $TPM_STRING
$outObject.logging += $logFormat -f $TPM_STRING, $TPM_VERSION_STRING, ($tpmVersion.SpecVersion), $FAIL_STRING

# Secure Boot Check
$isSecureBootEnabled = Confirm-SecureBootUEFI
```

#### Writing Results to Active Directory

```powershell
Set-ADComputer -Identity $env:COMPUTERNAME -Replace @{Info = $jsonOutput}
```

This ensures the compatibility result is stored as a JSON string in the `Info` attribute for each device.

#### Output Format in AD

- `returnCode`  
  - `0` = Compatible  
  - `1` = Incompatible (includes reasons)  
  - `-1` = Undetermined (usually access issues or script timing)  
- `logging`  
  - Contains detailed status of each compatibility check

#### Example Failures

- Storage: `OSDiskSize=58GB. FAIL`  
- TPM: `TPMVersion=False. FAIL`  
- Memory: `System_Memory=3GB. FAIL`  
- SecureBoot: `Capable=False. FAIL`

---

## Step 2: Reboot

- Leave the startup script active. In enterprise environments, allow **1–2 weeks** runtime.
- This gives time for machines to reboot naturally, especially if no enforced shutdown/reboot policies exist.
- Devices **must reboot** for the script to execute and populate Active Directory.

> **Important:** Machines must be online, domain-joined, and permitted to write to the AD `Info` attribute.

---

## Step 3: Generate the Compatibility Report

Run the companion script `Get-Win11ReadinessResults.ps1`.

### What It Does

- Queries AD for all computer objects with a populated `Info` field  
- Deserializes the JSON-formatted results  
- Categorises each machine as Compatible, Incompatible, or Undetermined

#### Example Reporting Logic

```powershell
$computers = Get-ADComputer -Filter 'Enabled -eq $true' -Properties Info,OperatingSystem |
    Where-Object { $_.Info -match '"returnCode":' }

$object = $jsonString | ConvertFrom-Json

switch ($object.returnCode) {
    0 { $category = "Compatible" }
    1 { $category = "Incompatible" }
    -1 { $category = "Undetermined" }
}
```

> Results are grouped and presented in simple tables, making it easy to identify patterns of failure.

---

## Handling Undetermined Results

Machines with a `returnCode` of `-1` typically failed to complete the check due to one of the following:

- `UnauthorizedAccessException`
- Secure Boot or TPM access blocked
- WMI not ready at boot

### Resolution

Switch from a **Startup Script** to a **Scheduled Task** with a 1–2 minute delay post-boot to allow WMI and system services to fully initialise.

---

## Recommended GPO Settings

To ensure successful execution and AD availability:

1. **Configure Logon Script Delay**
    - `Computer Configuration > Administrative Templates > System > Group Policy`  
    - Enable and set delay to **1 minute**

2. **Always wait for the network at computer startup and logon**
    - `Computer Configuration > Administrative Templates > System > Logon`  
    - Enable this to ensure AD is reachable

---

## Final Output Example

The report will return tables like the following:

### Incompatible Machines

| Computer Name | Operating System       | Status                          |
|---------------|------------------------|----------------------------------|
| LAPTOP-01     | Windows 10 Education   | Storage: OSDiskSize=58GB. FAIL  |
| SERVER-01     | Windows Server 2019    | TPM: TPMVersion=False. FAIL     |

### Compatible Machines

| Computer Name | Operating System       | Status |
|---------------|------------------------|--------|
| PC-01         | Windows 10 Education   | PASS   |
| PC-02         | Windows 10 Pro         | PASS   |

---

## Summary

While this method isn't flawless, it provides a clear, centralised view of Windows 11 readiness across your domain-joined devices using only built-in tools. It's fast to deploy and is integrated into Active Directory.

This guide was inspired by [Woshub.com](https://woshub.com/check-windows-11-hardware-readiness-powershell/), but has been streamlined and tailored for AD-based environments. My version is intentionally opinionated, single-purpose, and tightly integrated for domain environments, perfect for admins who want to keep it simple. 


## Download Links

<p><a href="/scripts/HardwareReadiness.ps1" download style="background:#D95E1A;color:white;padding:8px 12px;text-decoration:none;border-radius:6px;">Download HardwareReadiness.ps1</a></p>


<p><a href="/scripts/Get-Win11ReadinessResults.ps1" download style="background:#D95E1A;color:white;padding:8px 12px;text-decoration:none;border-radius:6px;">Download Get-Win11ReadinessResults.ps1</a></p>
