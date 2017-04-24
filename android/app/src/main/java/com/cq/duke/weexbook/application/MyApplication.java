package com.cq.duke.weexbook.application;

import android.app.Application;

import com.cq.duke.weexbook.utils.ImageAdapter;
import com.taobao.weex.InitConfig;
import com.taobao.weex.WXSDKEngine;

/**
 * Created by daiwenjun on 17/4/24.
 */

public class MyApplication extends Application{
    @Override
    public void onCreate() {
        super.onCreate();
        InitConfig config = new InitConfig.Builder().setImgAdapter(new ImageAdapter()).build();
        WXSDKEngine.initialize(this, config);
    }
}
