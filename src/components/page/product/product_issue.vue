<template>
  <div class="issue">
    <div class="process-con">
      <h1>发布产品流程</h1>
      <el-row>
        <el-col :span="8">
          <ul class="flex flex-row process-ul step1">
            <li><img src="http://smerchant.51myd.com/modules/jifenbao/shop/img/no1.png" alt=""></li>
            <li>
              <h3>NO.1</h3>
              <p>选择商品所在分类</p>
            </li>
          </ul>
        </el-col>
        <el-col :span="8">
          <ul class="flex flex-row process-ul step2">
            <li><img src="http://smerchant.51myd.com/modules/jifenbao/shop/img/no2.png" alt=""></li>
            <li>
              <h3>NO.2</h3>
              <p>填写商品详细信息</p>
            </li>
          </ul>
        </el-col>
        <el-col :span="8">
          <ul class="flex flex-row process-ul step3">
            <li><img src="http://smerchant.51myd.com/modules/jifenbao/shop/img/no3.png" alt=""></li>
            <li>
              <h3>NO.3</h3>
              <p>商品发布成功</p>
            </li>
          </ul>
        </el-col>
      </el-row>
    </div>
<!-- <autocomplete></autocomplete> -->
<p class="text-center" v-if="isShelves=='-1'">该店铺已到期下架</p>
<section v-if="isShelves=='1'">
    <div class="autocomplete-con">
        <span style="padding-right:15px;">分类搜索</span>
        <el-autocomplete
          popper-class="my-autocomplete"
          class="inline-input"
          v-model="searchText"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          :trigger-on-focus="true"
          @select="handleSelect">
          <el-button slot="append" icon="el-icon-search"></el-button>
          </el-autocomplete>
    </div>
    <el-row class="transfer-row">
      <el-col :span="8">
        <div class="transfer-con">
          <ul class="transfer-ul" v-loading="loadUse">
            <li v-for="(a,key) in arr" :key="key" @click="transTree(key,a.id,a.name,1)" :class="{active:current1===key}">{{a.name}}</li>
          </ul>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="transfer-con">
          <ul class="transfer-ul">
            <li v-for="(a,key) in arr2" :key="key" @click="transTree(key,a.id,a.name,2)" :class="{active:current2===key}">{{a.name}}</li>
          </ul>
        </div>
      </el-col>
      <el-col :span="8">
         <div class="transfer-con">
          <ul class="transfer-ul">
            <li v-for="(a,key) in arr3" :key="key" @click="transTree(key,a.id,a.name,3)" :class="{active:current3===key}">{{a.name}}</li>
          </ul>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <p class="all-current">您当前选择的商品类别是：<span>{{a}}{{b}}{{c}}</span></p>
    </el-row>
    <div class="panel-con">
      <el-button type="primary" style="display:block;margin:0 auto;margin-bottom:15px;" @click="goIssue">我已阅读以下规则，现在发布商品</el-button>
      <div class="panel">
        <div class="panel-heading">发布须知：克珞世禁止发布侵犯他人知识产权的商品，请确认商品符合知识产权保护的规定</div> 
        <div class="panel-body">
          <p class="text-center">克珞世规则</p> 
          <p class="text-center">第一章  概述</p> 
          <p class="text-center" style="overflow-y: scroll; height: 300px; line-height: 1.8; color: rgb(153, 153, 153); text-align: left;">
                                        发布须知：克珞世商城禁止发布侵犯他人知识产权的商品，请确认商品符合知识产权保护的规定
                                        克珞世商城规则
                                        <br> <b>第一章 概述</b> <br>
                                        第一条
                                        为促进开放、透明、分享、责任的新商业文明，保障克珞世商城用户合法权益，维护克珞世商城正常经营秩序，制定本规则。
                                        <br>
                                        第二条
                                        克珞世商城规则，是对克珞世商城用户增加基本义务或限制基本权利的条款。
                                        <br>
                                        第三条
                                        违规行为的认定与处理，应基于克珞世商城认定的事实并严格依规执行。克珞世商城用户在适用规则上一律平等。
                                        <br>
                                        第四条
                                        用户应遵守国家法律、行政法规、部门规章等规范性文件。对任何涉嫌违反国家法律、行政法规、部门规章等规范性文件的行为，本规则已有规定的，适用本规则；本规则尚无规定的，克珞世商城有权酌情处理。但克珞世商城对用户的处理不免除其应尽的法律责任。用户在克珞世商城的任何行为，应同时遵守与克珞世商城及其关联公司所签订的各项协议。 克珞世商城有权随时变更本规则并在网站上予以公告。若用户不同意相关变更，应立即停止使用克珞世商城的相关服务或产品。克珞世商城有权对用户行为及应适用的规则进行单方认定，并据此处理。
                                        <br> <b>第二章 定义</b> <br>
                                        第五条
                                        克珞世商城，域名为 51myd.com。
                                        <br>
                                        第六条
                                        用户，指具有完全民事行为能力的克珞世商城各项服务的使用者。
                                        <br>
                                        第七条
                                        会员，指与克珞世商城签订《克珞世商城服务协议》并完成注册流程的用户。一个会员可以拥有多个账户，每个账户对应唯一的会员名。
                                        <br>
                                        第八条
                                        买家，指在克珞世商城上浏览或购买商品的用户。
                                        <br>
                                        第九条
                                        卖家，指在克珞世商城上发布商品的会员。
                                        <br>
                                        第十条
                                        拍下，指买家在克珞世商城上点击并确认购买的行为。
                                        <br>
                                        第十一条
                                        订单，指买家向单一卖家同一时间拍下单款或多款商品的合约。订单中针对任一款商品的内容构成独立的交易。
                                        <br>
                                        第十二条
                                        商品发布数量，指卖家在克珞世商城上出售中及在线上仓库中商品款数的总和。
                                        <br>
                                        第十三条
                                        成交，指买家在克珞世商城上拍下商品并成功支付银果。
                                        <br>
                                        第十四条
                                        下架，指将出售中的商品转移至线上仓库。
                                        <br>
                                        第十五条
                                        包邮，指卖家对所售商品承担大陆地区首次发货的运费。
                                        <br> <b>第三章 交易</b> <br>
                                        第一节 注册
                                        <br>
                                        第十六条
                                        会员应当严格遵循克珞世商城系统设置的注册流程完成注册。会员在选择其克珞世商城会员名、克珞世商城店铺名或域名时应遵守国家法律法规，不得包含违法、涉嫌侵犯他人权利或干扰克珞世商城运营秩序等相关信息。
                                        <br>
                                        第二节 经营
                                        <br>
                                        第十七条
                                        会员应当按照克珞世商城系统设置的流程和要求发布商品。
                                        <br>
                                        第十八条
                                        “商品如实描述”及对其所售商品质量承担保证责任是卖家的基本义务。“商品如实描述”是指卖家在商品描述页面、店铺页面等所有克珞世商城提供的渠道中，应当对商品的基本属性、成色、瑕疵等必须说明的信息进行真实、完整的描述。卖家应保证其出售的商品在合理期限内可以正常使用，包括商品不存在危及人身财产安全的不合理危险、具备商品应当具备的使用性能、符合商品或其包装上注明采用的标准等。
                                        <br>
                                        第三节 超时规定
                                        <br>
                                        第十九条
                                        会员应当按照克珞世商城系统设置的交易流程进行交易。
                                        <br>
                                        第四节 评价
                                        <br>
                                        第二十条
                                        买卖双方有权基于真实的交易在银果交易成功后十五天内进行相互评价。
                                        <br> <b>第四章 市场管理</b> <br>
                                        第一节 市场管理措施
                                        <br>
                                        第三十四条
                                        为了提升消费者的购物体验，维护克珞世商城市场正常运营秩序，克珞世商城按照本规则规定的情形对会员及其经营行为采取以下临时性市场管控措施：(一)警告，是指克珞世商城通过口头或书面的形式对会员的不当行为进行提醒和告诫；(二)商品下架，是指将会员出售中商品转移至线上仓库；(三)单个商品搜索降权，是指调整商品在搜索结果中的排序；(四)全店商品搜索降权，是指调整会员店铺内所有商品在搜索结果中的排序；(五)单个商品搜索屏蔽，是指商品在搜索结果中不展现；(六)单个商品单一维度搜索默认不展示，是指商品信息在按价格、信用、销量等单一维度的搜索结果中默认不展现，但可经消费者主动选择后展现；(七)全店商品单一维度搜索默认不展示，是指会员店铺内所有商品在按价格、信用、销量等单一维度的搜索结果中默认不展现，但可经消费者主动选择后展现；(八)限制参加营销活动，是指限制卖家参加克珞世商城官方发起的营销活动；(九)单个商品监管，是指在一定时间内商品信息无法通过搜索、商品链接等方式查看；(十)店铺监管，是指在一定时间内会员店铺及店铺内所有商品信息无法通过搜索、店铺或商品链接等方式查看；(十一)支付违约金，是指根据协议约定或本规则规定由卖家向买家和/或克珞世商城支付一定金额的违约金。
                                        <br>
                                        第二节 市场管理情形
                                        <br>
                                        第三十五条
                                        卖家应积极提升自身经营状况，为消费者提供高品质的商品及优质的服务。对于符合商品品质好、服务质量高等情形的卖家，克珞世商城会适当给予鼓励或扶持的措施。
                                        <br>
                                        第三十六条
                                        克珞世商城根据卖家的好评率、店铺评分、退款率及纠纷退款率等，对低于克珞世商城指定标准的卖家限制参加克珞世商城营销活动，且给予全店商品在克珞世商城网单一维度搜索默认不展示。特殊市场另有规定的从其特殊规定。
                                        <br>
                                        第三十七条
                                        卖家所发布的商品信息各要素应真实合理，且应与商品本身相符。克珞世商城对符合下列任一情形的卖家给予全店商品在克珞世商城网单一维度搜索默认不展示：1、所发布商品一口价与描述价格严重不符的；2、刻意规避克珞世商城商品SKU设置规则的；3、商品标题、图片、价格、物流方式、邮费及售后服务等商品要素之间明显不匹配的；4、通过拆分数量、单位等规避搜索单一维度排序规则的。
                                        <br> <b>第五章 通用违规行为及违规处理</b> <br>
                                        第一节 违规处理措施
                                        <br>
                                        第三十八条
                                        为保障消费者、经营者或克珞世商城的正当权益，在会员违规处理期间克珞世商城按照本规则规定的情形对会员采取以下违规处理措施：(一)店铺屏蔽，指在搜索、导航、营销等各项服务中对会员店铺及商品等信息进行屏蔽。(二)限制发布商品，指禁止克珞世商城会员发布新商品。(三)限制发送站内信，指禁止克珞世商城会员发送站内信。(四)限制买家行为，指禁止克珞世商城会员购买商品。(五)关闭店铺，指删除克珞世商城会员的店铺，下架店铺内所有出售中的商品，禁止发布商品，并禁止创建店铺。
                                        <br>
                                        第二节 违规处理
                                        <br>
                                        第三十九条
                                        违规行为根据严重程度分为严重违规行为及一般违规行为，两者分别扣分、分别累计、分别执行。严重违规行为，是指严重破坏克珞世商城经营秩序，并涉嫌违反国家法律法规的行为。一般违规行为，是指除严重违规行为外的违规行为。违规行为根据适用的范围分为通用违规行为及特殊市场违规行为，特殊市场违规行为也遵循前款规定的严重违规行为与一般违规行为划分。
                                        <br>
                                        第四十条
                                        会员违规行为的纠正，是指：(一)发布违禁信息的，克珞世商城对会员所发布的违禁商品或信息及因此产生的交易评价进行删除；(二)出售假冒商品的，克珞世商城对会员所发布的假冒商品或信息进行删除；(三)出售未报关进口商品的，克珞世商城对会员所发布的未报关进口商品或信息进行删除；(四)盗用他人账户的，克珞世商城收回被盗账户并使原所有人可以通过账户申诉流程重新取回账户；(五)泄露他人信息的，克珞世商城对会员所泄露的他人隐私资料的信息进行删除；(六)骗取他人财物的，克珞世商城对用以骗取他人财物的商品或信息及因此产生的交易评价进行删除；(七)滥发信息的，克珞世商城删除会员所滥发的商品或信息，或对出售同样商品的两家以上店铺中信用积分较低的副店进行关闭；(八)虚假交易中通过不正当方式提高账户信用积分的，克珞世商城删除会员虚假交易产生的信用积分以及其两倍数量的其他信用积分，并下架店铺内所有商品；虚假交易中通过不正当方式提高商品销量的，克珞世商城删除该商品；(九)描述不符的，卖家对商品材质、成份、品质等信息的描述与买家收到的商品严重不符，或导致买家无法正常使用的，克珞世商城删除该描述不符的商品；卖家未对商品瑕疵等信息进行披露或对商品的描述与买家收到的商品不相符，且影响买家正常使用的，克珞世商城下架该描述不符的商品。(十)违背承诺的，卖家须偿还延迟发货所规定的违约金，履行如实描述义务或消费者保障服务规定的赔付、退货、换货、维修服务；或卖家须按实际交易价款向买家或克珞世商城提供发票；(十一)恶意评价的，克珞世商城或评价方删除该条违规评价；(十二)不当注册的，克珞世商城查封使用软件、程序方式大批量注册而成的账户；(十三)未依法公开或更新营业执照信息的，卖家公开或更新其营业执照信息；(十四)不当使用他人权利的，克珞世商城对会员所发布的不当使用他人权利的商品或信息进行删除；(十五)假冒材质成份的，克珞世商城对会员所发布的假冒材质成份的商品进行删除。
                                        <br>
                                        第三节 严重违规行为
                                        <br>
                                        第四十一条
                                        发布违禁信息，是指会员发布以下国家法律法规禁止发布的商品或信息的行为，包括以下情形：(一)发布以下商品或信息的：1、枪支、弹药、军火或相关器材、配件及仿制品；2、易燃、易爆物品或制作易燃易爆品的相关化学物品；3、毒品、麻醉品、制毒原料、制毒化学品、致瘾性药物、吸食工具及配件；4、含有反动、破坏国家统一、破坏主权及领土完整、破坏社会稳定涉及国家机密、扰乱社会秩序，宣扬邪教迷信，宣扬宗教、种族歧视等内容或相关法律法规禁止出版发行的书籍、音像制品、视频、文件资料；5、人体器官、遗体；6、用于窃取他人隐私或机密的软件及设备；7、正在流通的人民币，伪造变造的货币以及印制设备；8、麻醉注射枪及其相关商品；9、走私、盗窃、抢劫等非法所得；10、可致使他人暂时失去反抗能力、意识模糊的口服或外用的化学品，以及含有黄色淫秽内容的商品、信息；11、涉嫌违反《中华人民共和国文物保护法》相关规定的文物。(二)发布以下商品或信息的：1、管制类刀具及甩棍、弓、弩、飞镖等可能用于危害他人人身安全的管制器具；2、卫星信号的地面收发装置；3、伪造变造的政府机构颁发的文件、证书、公章或仅限国家机关或特定机构方可提供的服务；4、未经许可发布的奥林匹克运动会、世界博览会、亚洲运动会等特许商品；5、赌博用具及作弊工具；6、尚可使用的发票、其它可用于报销的票据以及此类票据的代开服务；7、精神类、麻醉类、有毒类、放射类药品；8、粉末、液态女性催情类商品；9、国家保护动物的活体、肢体、皮毛、标本、器官及制成品，已灭绝动物与现有国家二级以上保护动物的化石；10、身份证及身份证验证设备；11、可能用于侵害他人信息的黑客软件、教程、书籍。(三)发布以下商品或信息的：1、尚可使用的证券、政府发放的消费劵及相应代购、推荐服务；2、军警制服、标志及军警专用制品；3、带有宗教、种族歧视的相关商品或信息；4、有毒化学物、农药及相关信息；5、烟草专卖品；6、含有情色暴力低俗内容的漫画、书籍、游戏、音像制品以及SM用具、成人网站的账号及邀请码、原味二手内衣物、陪聊陪逛服务等情色低俗商品或信息；7、用于预防、治疗人体疾病的药物、血液制品或医疗器械；8、个人隐私信息及企业内部数据；9、国家保护的植物及其制品；10、由不具备生产资质的生产商生产的或不符合国家、地方、行业、企业强制性标准的商品；11、各类短信群发设备及软件；12、撬锁工具、开锁服务及其相关教程、书籍；13、因产品本身质量危及消费者人身、财产安全危险的产品。(四)发布以下商品或信息的：1、可能用于逃避交通管理的商品；2、未经许可的募捐类商品；3、未公开发行的国家级正式考试答案等未被允许公开发行的书籍音像类制品；4、发行时带有银行账户信息的银行卡；5、非法软件或密码破解找回等非法网络服务；6、特供酒、军需酒、自制酒；7、用于全新销售的伪造变造的数码商品；8、经权威质检部门或生产商认定、公布或召回的商品，国家明令淘汰或停止销售的商品，商品本身或外包装上所注明的产品标准、认证标志、成份及含量不符合国家规定的商品，过期、失效、变质的商品，以及含有罂粟籽的食品、调味品、护肤品等制成品；9、非法传销类商品；10、制作毒品、易燃易爆品的方法、书籍；11、利用电话线路上的直流馈电发光的灯；12、国家禁止的集邮票品以及未经邮政行业管理部门批准制作的集邮品，以及一九四九年之后发行的包含“中华民国”字样的邮品；13、算命、超度、风水、做法事等封建迷信类服务；14、一卡多号以及带破解功能的手机卡贴；15、外挂、私服相关的网游类商品。16、官方已停止经营的游戏点卡或平台卡商品；17、虚拟抽奖类商品；18、所有境外（含台服）游戏点卡、货币等相关服务类商品。
                                        <br>
                                        第四十二条
                                        盗用他人账户，是指盗用他人克珞世商城账户，涉嫌侵犯他人财产权的行为。
                                        <br>
                                        第四十三条
                                        泄露他人信息，是指未经允许发布、传递他人隐私信息，涉嫌侵犯他人隐私权的行为。
                                        <br>
                                        第四十四条
                                        骗取他人财物，是指以非法获利为目的，非法获取他人财物，涉嫌侵犯他人财产权的行为。
                                        <br>
                                        第四十五条
                                        扰乱市场秩序，是指通过不正当方式，刻意规避克珞世商城规则或市场管控措施的行为。
                                        <br>
                                        第四十六条
                                        不正当谋利，是指会员采用不正当手段谋取利益的行为，包括：(一)会员向克珞世商城工作人员及/或其关联人士提供财物、消费、款待或商业机会等；(二)会员通过其他手段谋取不正当利益的。
                                        <br>
                                        第四节 一般违规行为
                                        <br>
                                        第四十七条
                                        延迟发货，是指除定制、预售、适用特定运送方式特殊类目的商品外，卖家在买家付款后明确表示缺货或实际未在七十二小时内发货，妨害买家权益的行为。买卖双方另有约定的除外。卖家的发货时间，以快递公司系统内记录的时间为准。
                                        <br>
                                        第四十八条
                                        描述不符，是指买家收到的商品与达成交易时卖家对商品的描述不相符，卖家未对商品瑕疵、保质期、附带品等必须说明的信息进行披露，妨害买家权益的行为，包括以下情形：(一)卖家对商品材质、成份、品质等信息的描述与买家收到的商品严重不符，或导致买家无法正常使用的；(二)卖家未对商品瑕疵等信息进行披露或对商品的描述与买家收到的商品不相符，且影响买家正常使用的；(三)卖家未对商品瑕疵等信息进行披露或对商品的描述与买家收到的商品不相符，但未对买家正常使用造成实质性影响的。
                                        <br>
                                        第四十九条
                                        违背承诺，是指卖家未按照承诺向买家提供以下服务，妨害买家权益的行为，包括以下情形：(一)卖家违背以下承诺的：1、克珞世商城判定卖家确实应该承担因消费者保障服务产生的退货退款等售后保障责任但卖家拒绝承担的；2、克珞世商城判定卖家确实应该承担七天无理由退换货、假货赔三、数码维修、闪电发货赔付等售后保障责任但卖家拒绝承担的；3、卖家在收到消费者保障服务保证金催缴单之日起十四日内未足额缴纳保证金的；4、卖家参与试用中心的活动，但却在买家报名完成后拒绝向买家发送已承诺提供的试用商品的。
                                        <br>
                                        第五十条
                                        竞拍不买，是指买家拍得商品后拒不按其最终出价购买商品，妨害卖家权益的行为。
                                        <br>
                                        第五十一条
                                        恶意骚扰，是指卖家采取恶劣手段骚扰买家，妨害买家权益的行为。
                                        <br>
                                        第五十二条
                                        不当注册，是指用户通过软件、程序等方式，大批量注册克珞世商城账户，妨害克珞世商城运营秩序的行为。
                                        <br>
                                        第五十三条
                                        不当使用他人权利，是指用户发生以下行为：(一)卖家在所发布的商品信息或所使用的店铺名、域名等中不当使用他人商标权、著作权等权利的；(二)卖家出售商品涉嫌不当使用他人商标权、著作权、专利权等权利的；(三)卖家所发布的商品信息或所使用的其他信息造成消费者混淆、误认或造成不正当竞争的。同一权利人在三天内对同一卖家的投诉视为一次投诉。
                                        <br>
                                        第五节 违规的执行
                                        <br>
                                        第五十四条
                                        用户的违规行为，通过克珞世商城会员、权利人的投诉或克珞世商城排查发现。
                                        <br>
                                        第五十五条
                                        对违规行为的投诉，除滥发信息、虚假交易、不当注册、发布违禁信息、出售假冒商品、不当使用他人权利、盗用他人账户、泄露他人信息可随时提交投诉外，其余须在以下规定时间内进行投诉；未在规定时间内投诉的，不予受理：（一）延迟发货的投诉时间，为交易关闭后十五天内；（二）违背承诺的投诉时间，为买家拍下后十五天内；（三）描述不符、骗取他人财物的投诉时间为交易成功后十五天内；（四）恶意评价的投诉时间为评价生效后十五天内。
                                        <br>
                                        第五十六条
                                        对延迟发货、违背承诺及恶意评价的违规行为，被投诉人须在被投诉之日起三天内提交证据。逾期未提交证据的，克珞世商城有权根据当时所掌握的情况进行判断与处理。对其余违规行为的判断与处理，克珞世商城在收到投诉后立即进行。
                                        <br>
                                        第五十七条
                                        卖家自行作出的承诺或说明与本规则相悖的，克珞世商城不予采信。除证据有误或判断错误的情形外，对违规行为的处理不中止、不撤销。
          </p>
        </div>
      </div>
    </div>
</section>

<el-dialog
  title="提示"
  :visible.sync="addDialog"
  width="30%">
  <span>请填写{{addText}}地址</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="addDialog = false">暂不设置</el-button>
    <el-button type="primary" @click="addOk">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>


<script>
// import Autocomplete from "./autocomplete.vue"
import { Row,Col,Button, Select,Option, Autocomplete, Dialog } from 'element-ui'
export default {
  name: 'issue',
  components: {
    Autocomplete,
    'el-row':Row,
    'el-col':Col,
    'el-button':Button,
    'el-select':Select,
    'el-option':Option,
    'el-autocomplete':Autocomplete,
    'el-dialog':Dialog
  },
  data () {
    return {
      loadUse:false,
      addDialog:false,
      href:'',
      addText:'',//收货/退货地址
          searchText: '',//搜索输入文本
          restaurants: [],//输入搜索的数组对象
          goIssueId:'',//三级页面id
          current1:'',//第一列active
          current2:'',//第二列active
          current3:'',//第三列active
          a:'',//当前选中的第一列的名称
          b:'',//当前选中的第二列的名称
          c:'',//当前选中的第三列的名称
          arr:[],//第一列的同pid下的数组对象
          arr2:[],//第二列的同pid下的数组对象
          arr3:[],//第三列的同pid下的数组对象
          searchArr3:[],//第三列dpath=3下的全部数组对象
          searchArr2:[],//第二列dpath=2下的全部数组对象
          
           factorial:(function foo(arr,id) {
              if(!Array.isArray(arr) || arr.length<=0){
                return ''
              }
              let Arr = []
              //let map = {}//将数据存储为 以 id 为 KEY 的 map 索引数据列
              arr.forEach(item => {
                if(item.children != null && item.children.length>0){                  
                      let _obj = item.children
                      for(var j=0,_len=_obj.length;j<_len;j++){
                        if(id == _obj[j].parentId){
                            // map[_obj[j].id] = _obj[j];
                            Arr.push(_obj[j])
                        }
                      }
                }
              }) 
              return Arr            
          })
    }
  },
  // beforeDestroy(){
  //   this.bus.$off("class")
  // },
  created () {
      this.$store.state.adminleftnavnum="/issue"; //设置左侧导航active
      //console.log(this.$store.state.isShelves)

  },
  computed:{
      isShelves(){
        return sessionStorage.getItem('isShelves')
      }
  },
  mounted(){
      let _this = this
      this.loadUse = true
      //获取商品分类列表
      //'/hn-shop-web/goodsCategories/list'
      //this.$axios.post(this.$$jk.goodsCategoriesList,{})
      this.$axios.post('goodsCategoriesList',{})
          .then(function(response) {
            let listArr = response.data
            //console.log(listArr)
            if(listArr.code == "SUCCESS"){
              //渲染第一层列表
              _this.arr = listArr.data
              _this.getNode(listArr.data)//递归取第二层searchArr2，第三层searchArr3数组对象
              _this.searchArr3 = _this.$dash.flatten(_this.searchArr3)//降维[{},{}...]
              _this.searchArr2 = _this.$dash.flatten(_this.searchArr2)//降维[{},{}...]
              //重组第三层数据，ex：拼装成[{value:'手机配件'}]，组件能够识别的数据格式
              _this.searchArr3.forEach(item => {
                  _this.restaurants.push({
                    value:item.name,//重要：组件能够识别的value
                    id:item.id,
                    pid:item.parentId
                  })
              })
            }
            setTimeout(()=>{
              _this.loadUse = false;
            },500)
          })
          .catch(function(error) {
              alert(error);
          }); 
  },
  methods: {
// confirmFn(val,href) {
//     this.$confirm('请去填写'+val+'地址', '提示', {
//       confirmButtonText: '确定',
//       cancelButtonText: '暂不设置',
//       type: 'warning',
//       center: true
//     }).then(() => {
//       this.$router.push(href)
//     }).catch(() => {
//     });
// },   
addOk(){
  this.addDialog = false
  this.$router.push(this.href)
} ,
    //判断发货地址
addressFn(num){
    let id = sessionStorage.getItem('merchantId')
    let trans = {
      isSend:num,
      merchantId:id,
      pageNum:1,
      pageSize:1
    }  
    return new Promise((resolve, reject) => {
      //this.$axios.post(this.$$jk.getAddrsListByMerchantId,trans)
      this.$axios.post('getAddrsListByMerchantId',trans)
        .then((response) => {
            if(response.data.code == "SUCCESS"){
              let r = response.data.data
              console.log(r)
              if(r.list.length === 0){
                resolve(false)
              }else{
                resolve(true)
              }
            }
        })
        .catch(function(error) {
            alert(error);
        });
    })
},
// 发布之前,      //我已阅读规则
goIssue(){
      // var newWindow = window.open();
      // console.log(this.$route.path)
      // return false;
      // var newWin = window.open('about:blank');
      let _this = this
      this.addressFn(1).then((res) => {  
        if(res){
          console.log("有发货地址")
          let that = _this
          _this.addressFn(2).then((res2) => {
            if(res2){
              console.log("有退货地址")
              that.addText=""
              if(that.goIssueId){
                that.$router.push({path:'/editor',query:{classify:that.a+that.b+that.c,categoryId:that.goIssueId}}) 
              }else{
                that.$message({
                  message:'请选择商品分类',
                  type:'warning'
                })
                return false;
              }               
              return false;
            }else{
              // that.confirmFn('退货','/returnAddress')
              // that.$message({
              //   message:'请去填写退货地址',
              //   type:'warning'
              // })
              that.addDialog = true
              that.addText='退货'
              that.href = '/returnAddress'
              console.log("请去填写退货地址")
              // window.open('http://localhost:8082/#/returnAddress')
              
              // setTimeout(() => {
              //     that.$router.push('/returnAddress')
              // }, 3000);
              
              return false;
            }
          })
          return false
        }else{
          // _this.confirmFn('发货','/address')
          console.log("请去填写发货地址")
          _this.addDialog = true
          _this.addText = '发货'
          _this.href = '/address'
          // window.open('http://localhost:8082/#/address')
          // _this.$message({
          //   message:'请去填写发货地址',
          //   type:'warning'
          // })
          // setTimeout(() =>{
          //   _this.$router.push('/address')
          // },3000)
          return false
        }
      }) 
},
       //第三层 深度遍历整个JSON
       getNode(data){
          for (var i in data) {
              //取第二层数据
              if(data[i].dpath == 2){
                  this.searchArr2.push(data)
              } 
              //取第三层数据
              if (data[i].dpath == 3) {
                  this.searchArr3.push(data)
                  break;
              }else {
                  this.getNode(data[i].children);
              }
          }
       },  

//搜索-start
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        //cb(results);
        cb(restaurants)
      },
      //匹配条件
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) != -1);
        };
      },
      //查询下拉列表的点击事件
      handleSelect(item) {
          //清空二列，三列
          this.arr3 = []
          this.arr2 = []
          //第三列dpath=3数组对象
          let searchArr3 = this.searchArr3
          //筛选出第三列同pid的数组对象存入arr3中
          for(let i in searchArr3){
            if(searchArr3[i].parentId == item.pid){
              this.arr3.push(searchArr3[i])
            }
          }
          //计算选中的分类在同pid的列中的索引，主要是为了添加active的状态并记录选中第三列中元素的id，便于路由传值
          let arr3 = this.arr3
          for(let j in arr3){
            if(arr3[j].id == item.id){
              this.current3 = parseInt(j)
              this.c = '>'+item.value
              this.goIssueId = item.id
            }
          }
          //在mounted中，我已将所有dpath=2的元素存入searchArr2中并降维
          let searchArr2 = this.searchArr2
          //第三列所在集合的父元素obj
          let indexlist2 = null
          //通过第三列共同的pid是第二列元素的id这个逻辑，找到第二列当前元素
          for(let i in searchArr2){
            if(searchArr2[i].id == item.pid){
              indexlist2 = searchArr2[i]
            }
          }
          //根据当前元素的pid，找到同pid的集合arr2
          if(indexlist2){
            for(let i in searchArr2){
              if(searchArr2[i].parentId == indexlist2.parentId){
                this.arr2.push(searchArr2[i])
              }
            }
          }
          //lodash的uniq数组对象去重
          this.arr2 = this.$dash.uniq(this.arr2)
          //计算选中的分类在同pid的列中的索引，主要是为了添加active的状态
          let arr2 = this.arr2
          for(let j in arr2){
            if(arr2[j].id == indexlist2.id){
               this.current2 = parseInt(j)
               this.b = '>'+ arr2[j].name
            }
          }
          //根据第二层pid找到第一层当前类
          let arr = this.arr;
          let indexlist
          for(let i in arr){
              if(arr[i].id == indexlist2.parentId){
                  indexlist = arr[i]
              }
          }
          //计算选中的分类在同pid的列中的索引，主要是为了添加active的状态
          for(let i in arr){
            if(arr[i].id == indexlist.id){
              this.current1 = parseInt(i)
              this.a = arr[i].name
            }
          }
      },
//搜索-end
      //穿梭树
      //id:当前类id；grade:当前类所在的级别
      transTree(index,id,name,grade){
          this.searchText = ""
          if(grade == 1){
            this.arr2 = this.factorial(this.arr,id)
            this.arr3 = ''
            this.current1 = index
            this.current2=''
            this.current3=''
            this.a = name;
            this.b = '';
            this.c = ''
          }else if(grade == 2){
            this.arr3 = this.factorial(this.arr2,id)
            this.current2 = index
            this.current3 = ''
            this.b = '>'+name
            this.c = ''
          }else{
            this.current3 = index
            this.c = '>'+name
            this.goIssueId = id
          }
      },
      fun(arr){
          let newArr = []
          for(var i=0;i<arr.length;i++){
              if(Array.isArray(arr[i])){
                  fun(arr[i]);
              }else{
                  newArr.push(arr[i]);
              }
          }
          return newArr;
      }
  },
  watch:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.process-con{
  padding:20px 15px;
  margin-bottom: 20px;
  background-color: #fff;
  border: 1px solid transparent;
  border-radius: 4px;
  -webkit-box-shadow: 0 1px 1px rgba(0,0,0,.05);
  box-shadow: 0 1px 1px rgba(0,0,0,.05);
}
.process-con>h1{
  font-size:24px;
  color:#969696;
  font-weight: 500;
  padding:10px 0 25px 0;
}
.process-con p{
  font-size:18px;
  color:#969696;
}
.process-con h3{
  font-size:24px;
  font-weight: 500;
}
.step1 h3{
  color:#fe3d7c;
}
.step2 h3{
  color:#00b4ff;
}
.step3 h3{
  color:#ff6000;
}
.process-ul>li:last-child{
  margin-left:8px;
}
.panel-con{
  padding:0 15px;
  background-color: #fff;
}
.panel {
    margin-bottom: 20px;
    border: 1px solid transparent;
    border-radius: 4px;
    -webkit-box-shadow: 0 1px 1px rgba(0,0,0,.05);
    box-shadow: 0 1px 1px rgba(0,0,0,.05);
}
.panel-heading {
    border-bottom: 1px dashed #ffd8ab;
    color: #969696;
    padding: 10px 15px;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
}
.panel-body {
    padding: 15px;
}
.text-center {
    text-align: center;
    margin-bottom:10px;
}
/* 穿梭框 */
.transfer-row{
  background:#fff;
  padding:15px;
}
.transfer-con{
    border: 1px solid #ededed;
    padding: 10px;
    height: 280px;
    overflow-y: auto;
}
.transfer-ul>li{
    padding: 10px 15px;
    position: relative;
    cursor: pointer;
}
.transfer-row .el-col:not(:last-child) .transfer-ul>li::before{
    content: '';
    position: absolute;
    left: 0px;
    top: 50%;
    -webkit-transform: translate3d(0,-50%,0) rotate(45deg);
    width: 8px;
    height: 8px;
    border-right: 1px solid #9e9e9e;
    border-top: 1px solid #9e9e9e;
}
.active {
    color: #fff;
    background-color: #4aa6ec;
}
.transfer-row .el-col:not(:last-child) .transfer-ul>li.active::before{
    border-right: 1px solid #fff;
    border-top: 1px solid #fff;
}
.all-current{
  padding:15px;
  background: #fffaf5;
  color:#969696;
}
.all-current>span{
  color:#f83c37;
}
.autocomplete-con{
  background:#fff;
  text-align:center;
  padding-top:15px;
}
</style>
<style>
.my-autocomplete {
  padding-bottom:15px;
  background:#fff;
}
</style>
<style lang="less">
// .el-loading-parent--relative{
//   .el-loading-mask{
//     .el-loading-spinner{
//       top:8%;
//     }
//   }
// }
</style>
  
