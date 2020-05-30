<?xml version="1.0"?>
<recipe>
    <!-- Fragment -->

    <instantiate from="src/feature_package/ui/fragment/BlankFragment.kt.ftl"
                 to="${escapeXmlAttribute(srcOut)}/${subpackage}ui/fragment/${className}.kt" />

    <open file="${escapeXmlAttribute(srcOut)}/${subpackage}ui/fragment/${className}.kt" />

    <!-- ViewModel-->
    <#if includeViewModel>
    <instantiate from="src/feature_package/presentation/viewmodel/BlankViewModel.kt.ftl"
                   to="${escapeXmlAttribute(srcOut)}/${subpackage}viewmodel/${viewModelName}.kt" />

    <open file="${escapeXmlAttribute(srcOut)}/${subpackage}viewmodel/${viewModelName}.kt" />
    </#if>

    <!-- Fragment layout-->
    <#if includeLayout>
        <instantiate from="res/layout/fragment_blank.xml.ftl"
                       to="${escapeXmlAttribute(resOut)}/layout/${escapeXmlAttribute(fragmentName)}.xml" />

        <open file="${escapeXmlAttribute(resOut)}/layout/${escapeXmlAttribute(fragmentName)}.xml" />
    </#if>

</recipe>
