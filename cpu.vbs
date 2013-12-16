On Error Resume Next
Set fso=WScript.CreateObject("Scripting.FileSystemObject")
strComputer = "."
Set objWMIService = GetObject("winmgmts:" _
    & "{impersonationLevel=impersonate}!\\" & strComputer & "\root\cimv2")

Set colItems = objWMIService.ExecQuery("Select * from Win32_Processor",,48)
dim cpuchare,cputemp
cpuchare =0
cputemp  =0

For Each objItem in colItems
	mesg=mesg & "Address Width: " & objItem.AddressWidth & vbCrLf
    mesg=mesg & "Architecture: " & objItem.Architecture & vbCrLf
    mesg=mesg & "Availability: " & objItem.Availability & vbCrLf
    mesg=mesg & "CPU Status: " & objItem.CpuStatus & vbCrLf
    mesg=mesg & "Current Clock Speed: " & objItem.CurrentClockSpeed & vbCrLf
    mesg=mesg & "Data Width: " & objItem.DataWidth & vbCrLf
    mesg=mesg & "Description: " & objItem.Description & vbCrLf
    mesg=mesg & "Device ID: " & objItem.DeviceID & vbCrLf
    mesg=mesg & "External Clock: " & objItem.ExtClock & vbCrLf
    mesg=mesg & "Family: " & objItem.Family & vbCrLf
    mesg=mesg & "L2 Cache Size: " & objItem.L2CacheSize & vbCrLf
    mesg=mesg & "L2 Cache Speed: " & objItem.L2CacheSpeed & vbCrLf
    mesg=mesg & "Level: " & objItem.Level & vbCrLf
	'charge CPU
    mesg=mesg & "Load Percentage: " & objItem.LoadPercentage & vbCrLf
	cpuchare = objItem.LoadPercentage
    mesg=mesg & "Manufacturer: " & objItem.Manufacturer & vbCrLf
    mesg=mesg & "Maximum Clock Speed: " & objItem.MaxClockSpeed & vbCrLf
    mesg=mesg & "Name: " & objItem.Name & vbCrLf
    mesg=mesg & "PNP Device ID: " & objItem.PNPDeviceID & vbCrLf
    mesg=mesg & "Processor ID: " & objItem.ProcessorId & vbCrLf
    mesg=mesg & "Processor Type: " & objItem.ProcessorType & vbCrLf
    mesg=mesg & "Revision: " & objItem.Revision & vbCrLf
    mesg=mesg & "Role: " & objItem.Role & vbCrLf
    mesg=mesg & "Socket Designation: " & objItem.SocketDesignation & vbCrLf
    mesg=mesg & "Status Information: " & objItem.StatusInfo & vbCrLf
    mesg=mesg & "Stepping: " & objItem.Stepping & vbCrLf
    mesg=mesg & "Unique Id: " & objItem.UniqueId & vbCrLf
    mesg=mesg & "Upgrade Method: " & objItem.UpgradeMethod & vbCrLf
    mesg=mesg & "Version: " & objItem.Version & vbCrLf
    mesg=mesg & "Voltage Caps: " & objItem.VoltageCaps & vbCrLf
	mesg=mesg & "Temp CPU: " & CurCelTemp & vbCrLf
	cputemp = CurCelTemp
		
Next
 ' utilisation cpu   
  fichier="cpus.txt"
  Set ficcmd = fso.CreateTextFile(fichier)
		ficcmd.writeline cpuchare
		ficcmd.close
'-----------------------------------------------------------
   fichier="cput.txt"
  Set ficcmd = fso.CreateTextFile(fichier)
		ficcmd.writeline cputemp
		ficcmd.close