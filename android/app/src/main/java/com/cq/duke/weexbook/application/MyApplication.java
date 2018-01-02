package com.cq.duke.weexbook.application;

import android.app.Application;

import com.cq.duke.weexbook.module.UtilModule;
import com.cq.duke.weexbook.utils.ImageAdapter;
import com.taobao.weex.InitConfig;
import com.taobao.weex.WXSDKEngine;
import com.taobao.weex.common.WXException;

/**
 * Created by daiwenjun on 17/4/24.
 */

public class MyApplication extends Application{
    @Override
    public void onCreate() {
        super.onCreate();
        InitConfig config = new InitConfig.Builder().setImgAdapter(new ImageAdapter()).build();
        WXSDKEngine.initialize(this, config);
        try {
            WXSDKEngine.registerModule("util", UtilModule.class);
        } catch (WXException e) {
            e.printStackTrace();
        }
    }
}
