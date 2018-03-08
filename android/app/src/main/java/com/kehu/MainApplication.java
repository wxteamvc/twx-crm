package com.kehu;

import android.app.Application;

import com.theweflex.react.WeChatPackage;
import cn.reactnative.httpcache.HttpCachePackage;
import com.facebook.react.ReactApplication;
import com.lynxit.contactswrapper.ContactsWrapperPackage;
import com.beefe.picker.PickerViewPackage;
// import com.RNFetchBlob.RNFetchBlobPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import cn.jpush.reactnativejpush.JPushPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import java.util.Arrays;
import java.util.List;
import cn.jiguang.imui.messagelist.ReactIMUIPackage;
import com.rnfs.RNFSPackage;


public class MainApplication extends Application implements ReactApplication {
  private boolean SHUTDOWN_TOAST = false;
  private boolean SHUTDOWN_LOG = false;

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new ContactsWrapperPackage(),
            new PickerViewPackage(),
            new WeChatPackage(),
            new HttpCachePackage(),
            // new RNFetchBlobPackage(),
            new VectorIconsPackage(),
            new PickerPackage(),
            new RNDeviceInfo(),
            new JPushPackage(SHUTDOWN_TOAST, SHUTDOWN_LOG),
            new RNSpinkitPackage(),
            new ReactIMUIPackage(),
            new RNFSPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
