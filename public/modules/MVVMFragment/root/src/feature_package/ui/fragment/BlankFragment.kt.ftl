package ${packageName}${dotSubpackage}.ui.fragment

import androidx.fragment.app.Fragment
import android.os.Bundle
import android.view.View
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import ${packageName}.R
import ${packageName}${dotSubpackage}.viewmodel.${viewModelName}
<#if includeLayout> import kotlinx.android.synthetic.main.${fragmentName}.*</#if>

class ${className} : Fragment(<#if includeLayout>R.layout.${fragmentName}</#if>) {

  private val viewModel: ${viewModelName} by lazy {
        ViewModelProvider(this).get(${viewModelName}::class.java)
  }

  override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

    }
}
