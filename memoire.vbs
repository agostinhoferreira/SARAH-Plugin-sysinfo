On Error Resume Next 
Set fso = CreateObject("Scripting.FileSystemObject")
 strComputer = "." 
Set objServices = GetObject( "winmgmts:{impersonationLevel=impersonate," & "authenticationLevel=pktPrivacy}!root/cimv2")
'=========================================================================================
' ----- requette db process pour conso mémoire ----------------
set objProcessSet = objServices.ExecQuery ("SELECT * FROM Win32_Process")
' --------- declaration variable ------------------------------ 
dim memoire,maximemoire,indexmemoire, nameservice , nbservice
'--------- compte la mémoire utilisé par process ---------------
 nbservice = 0
' boucle de lecture process 
For Each Process in objProcessSet
    nameservice = Process.Name & ";" & nameservice 
	memoire = memoire + Int(Process.WorkingSetSize)
	nbservice =  nbservice + 1
Next
 
'=======================================================================================
Set objWMIService = GetObject("winmgmts:" & "{impersonationLevel=impersonate}!\\" & strComputer & "\root\cimv2")
'========= definition variables
maximemoire = 0
'========= requette base de données 
Set col = objWMIService.ExecQuery("Select * from Win32_PhysicalMemory",,48)
For Each Item in col
	capa=Item.Capacity/1024/1024
	 maximemoire= maximemoire+capa
	'affiche le barrete mémoire debug
	'wscript.echo "Barrette " & Item.DeviceLocator & " " & capa & " Mo " & Item.BankLabel 
	Next
' total de barette mémoire	debug
'wscript.echo "TOTAL" &  maximemoire & "Mo " 

memoire = Round(memoire /1048576)
indexmemoire = maximemoire /100

fichier="mem.txt"
  Set ficcmd = fso.CreateTextFile(fichier)
		ficcmd.writeline Round( memoire / indexmemoire,2) 
		ficcmd.close
		
fichier="service.txt"
  Set ficcmd = fso.CreateTextFile(fichier)
		ficcmd.writeline  nameservice
		ficcmd.close

fichier="servicenb.txt"
  Set ficcmd = fso.CreateTextFile(fichier)
		ficcmd.writeline  (nbservice-1)
		ficcmd.close
