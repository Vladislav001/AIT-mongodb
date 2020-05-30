<?xml version="1.0"?>
<globals>
  
    <global id="subpackage" value="<#if useSubPackage>${subPackage}/<#else></#if>" />
    <global id="dotSubpackage" value="<#if useSubPackage>.${subPackage}<#else></#if>" />
    <global id="superClassBase" type="string" value="${packageName}.ui.fragment.BaseFragment" />
</globals>
