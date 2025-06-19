package com.rntosty

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = RnTostyModule.NAME)
class RnTostyModule(reactContext: ReactApplicationContext) :
  NativeRnTostySpec(reactContext) {

  override fun getName(): String {
    return NAME
  }

  companion object {
    const val NAME = "RnTosty"
  }
}
