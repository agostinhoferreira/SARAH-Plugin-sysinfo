On Error Resume Next 
Set fso = CreateObject("Scripting.FileSystemObject")
 strComputer = "." 
Set objServices = GetObject( _
    "winmgmts:{impersonationLevel=impersonate," _
    & "authenticationLevel=pktPrivacy}!root/cimv2")
set objProcessSet = objServices.ExecQuery _
     ("SELECT * FROM Win32_Process")
'--------- declaration variable ------------------------------ 
dim memoire,maximemoire,indexmemoire, nameservice , nbservice
'--------- compte la mémoire utilisé ---------------
 nbservice = 0
For Each Process in objProcessSet
    nameservice = Process.Name & ";" & nameservice 
	memoire = memoire + Int(Process.WorkingSetSize)
	nbservice =  nbservice + 1
Next

 
'=======================================================================================
Set objWMIService = GetObject("winmgmts:" _
    & "{impersonationLevel=impersonate}!\\" & strComputer & "\root\cimv2")

Set colItems = objWMIService.ExecQuery("Select * from Win32_Processor")
dim cpuchare
cpuchare =0

For Each objItem in colItems
    'memoire
    maximemoire = objItem.L2CacheSize
   	'charge CPU
   	cpuchare = objItem.LoadPercentage
 Next

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
