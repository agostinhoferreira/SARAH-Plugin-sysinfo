'=========================================================================================================
' Crée un fichier .json du CPU, pour plugin sysinfo SARAH .
' cpu.vbs
' Auteur: Ferreira Agostinho
' Version 1.02
' Version 1.03 creation du fichier .json
' **********************************************************************************************************
' objet = cpu.
'===========================================================================================================
On Error Resume Next
Set fso=WScript.CreateObject("Scripting.FileSystemObject")
strComputer = "."
dim cpucharge,ventilo, addressIP
'=================== status des ventilateur ================================
Set objWMIService = GetObject("winmgmts:\\" & strComputer & "\root\CIMV2") 
Set colItems = objWMIService.ExecQuery( "SELECT * FROM Win32_Fan",,48) 
For Each objItem in colItems 
       ventilo = objItem.Status
Next
'========================================================================================
' Adress IP de la carte reseau ne prendre que la premier
Set colAdapters = objWMIService.ExecQuery("Select * from Win32_NetworkAdapterConfiguration Where IPEnabled = True")
addressIP = ""
For Each objAdapter in colAdapters
    IPdebut = LBound(objAdapter.IPAddress)
    IPfin = UBound(objAdapter.IPAddress)
    If (objAdapter.IPAddress(IPdebut) <> "") then
        For i = IPdebut To IPfin
				'ne pas reprendre si deja prie
		        if ( addressIP = "" ) then 
					addressIP =  objAdapter.IPAddress(i) 
				end if
        Next     
    End If
Next
'===========================================================================
Set objWMIService = GetObject("winmgmts:" & "{impersonationLevel=impersonate}!\\" & strComputer & "\root\cimv2")
Set colItems = objWMIService.ExecQuery("Select * from Win32_Processor",,48)
'===========================================================================
json_file="{""cpu"" :{"
For Each objItem in colItems
	json_file=json_file & """Address_Width""" & ":" & """" & objItem.AddressWidth & ""","  
    json_file=json_file & """Architecture""" & ":" & """" & objItem.Architecture & ""","  
    json_file=json_file & """Availability""" & ":" & """" & objItem.Availability & ""","  
    json_file=json_file & """CPU_Status""" & ":" & """" & objItem.CpuStatus& ""","  
    json_file=json_file & """Current_Clock_Speed""" & ":" & """" & objItem.CurrentClockSpeed& ""","  
    json_file=json_file & """Data_Width""" & ":" & """" & objItem.DataWidth & ""","  
    json_file=json_file & """Description""" & ":" & """" & objItem.Description & ""","  
    json_file=json_file & """Device_ID""" & ":" & """" & objItem.DeviceID & ""","  
    json_file=json_file & """External_Clock""" & ":" & """" & objItem.ExtClock & ""","  
    json_file=json_file & """Family""" & ":" & """" & objItem.Family & ""","  
    json_file=json_file & """L2_Cache_Size""" & ":" & """" & objItem.L2CacheSize & ""","  
    json_file=json_file & """L2_Cache_Speed""" & ":" & """" & objItem.L2CacheSpeed & ""","  
    json_file=json_file & """Level""" & ":" & """" & objItem.Level & ""","  
	json_file=json_file & """LoadPercentage""" & ":" & """" & objItem.LoadPercentage & ""","
	json_file=json_file & """Manufacturer""" & ":" & """" & objItem.Manufacturer & ""","  
    json_file=json_file & """Maximum_Clock_Speed""" & ":" & """" & objItem.MaxClockSpeed & ""","  
    json_file=json_file & """Name""" & ":" & """" & objItem.Name & ""","  
	json_file=json_file & """PNP_Device_ID""" & ":" & """" & objItem.PNPDeviceID & ""","  
    json_file=json_file & """Processor_ID""" & ":" & """" & objItem.ProcessorId & ""","  
    json_file=json_file & """Processor_Type""" & ":" & """" & objItem.ProcessorType & ""","  
    json_file=json_file & """Revision""" & ":" & """" & objItem.Revision & ""","  
    json_file=json_file & """Role""" & ":" & """" & objItem.Role & ""","  
    json_file=json_file & """Socket_Designation""" & ":" & """" & objItem.SocketDesignation & ""","  
    json_file=json_file & """Status_Information""" & ":" & """" & objItem.StatusInfo & ""","  
    json_file=json_file & """Stepping""" & ":" & """" & objItem.Stepping & ""","  
    json_file=json_file & """Unique_Id""" & ":" & """" & objItem.UniqueId & ""","  
    json_file=json_file & """Upgrade_Method""" & ":" & """" & objItem.UpgradeMethod & ""","  
    json_file=json_file & """Version""" & ":" & """" & objItem.Version & ""","  
    json_file=json_file & """Voltage_Caps""" & ":" & """" & objItem.VoltageCaps & """," 
    json_file=json_file & """Ventilateur""" & ":" & """" & ventilo & """," 	
	json_file=json_file & """AddressIP""" & ":" & """" & addressIP & """," 
	json_file=json_file & """Temp_CPU""" & ":" & """" & CurCelTemp & """"  
Next

json_file=json_file & "} }"

'====== debug pour la température retire le ' de la ligne suivante 
'wscript.echo json_file 
'=================================================
' tout les info cpu en json   
  fichier=".\plugins\sysinfo\cpu.json"
  Set ficcmd = fso.CreateTextFile(fichier)
		ficcmd.writeline json_file
		ficcmd.close

'-----------------------------------------------------------	
	
