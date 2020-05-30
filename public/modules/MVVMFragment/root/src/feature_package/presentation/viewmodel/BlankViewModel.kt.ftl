package ${packageName}${dotSubpackage}.viewmodel

import androidx.lifecycle.MutableLiveData
import ${packageName}.infrastructure.viewmodel.BaseViewModel
import kotlinx.coroutines.*
import org.koin.core.KoinComponent
import org.koin.core.inject

class ${viewModelName} : BaseViewModel()<#if includeInteractor>, KoinComponent</#if> {

    <#if includeInteractor>// private val interactor: ${interactorName} by inject()</#if>

    init {

    }

    //Events

    //Private methods
}
