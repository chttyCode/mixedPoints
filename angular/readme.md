# angular

- 开发工具
  - vscode
    - Path Intellisense  visual Studio Code plugin that autocompletes filenames
    - Angular Files Quickly scaffold angular file templates
    - Angular Language Service Editor services for Angular templates
    - Angular Snippets This extension for Visual Studio Code adds snippets for Angular for TypeScript and HTML.
- 指令
  - 组件 — 拥有模板的指令

   ```JS
      /**
     * 模板的指令是没有模版的组件，它需要一个宿主元素。
     * 推荐使用方括号 [] 指定 Selector，使它变成一个属性。
     * <span appItem > 该span为宿主元素，设置的样式将应用到该宿主上
     * 为什么不直接叫做 "Item"？
     * 尽管 Item 是一个比 appItem 更简洁的名字，而且它确实也能工
     * 作。 但是最佳实践是在选择器名字前面添加前缀，以确保它们不会与标准  HTML  属性冲突。 它同时减少了与第三方指令名字发生冲突的危险。
     * 确认你没有给 appItem 指令添加ng前缀。 那个前缀属于 Angular，使用它
     * 可能导致难以诊断的 bug。例如，这个简短的前缀 app 可以帮助你区分自定义指令。
     */
     import { Directive, ElementRef } from '@angular/core';
      @Directive({
      selector: '[appItem]'
      })
      export class ItemDirective {
      constructor(el: ElementRef) {
         el.nativeElement.style.backgroundColor = 'yellow';
      }
      @HostListener('mouseenter') onMouseEnter() {
        this.highlight('yellow');
      }

      @HostListener('mouseleave') onMouseLeave() {
        this.highlight(null);
      }
      @HostBinding('style.display') display = 'flex';
      }
      private highlight(color: string) {
        this.el.nativeElement.style.backgroundColor = color;
      }
   ```

  - 属性型指令 — 改变元素、组件或其它指令的外观和行为的指令。
    - NgClass 添加和删除一组 CSS 类。
  
    ```JS
        this.currentClasses =  {
        'saveable': this.canSave,
        'modified': !this.isUnchanged,
        'special':  this.isSpecial
      };
      //单个class写法
      <div [ngClass]="idx === selectedVariantIndex ? ''variant-selected'' : ''">
        判断表达式idx === selectedVariantIndex 真假 添加或删除 variant-selected
      </div>
      //对象形式模版写法
      <div [ngClass]="{ 'variant-selected': idx === selectedVariantIndex }" >
        判断表达式idx === selectedVariantIndex 真假 添加或删除 variant-selected
      </div>
      //对象变量
      <div [ngClass]="currentClasses">
      currentClasses对象具有一个根据其他三个组件属性的 true / false 状态来添加或删除三个 CSS 类的对象。
      该对象的每个键(key)都是一个 CSS 类名。如果要添加上该类，则其值为 true，反之则为 false 。
      </div>
    ```

    - NgStyle 根据组件的状态同时动态设置多个内联样式。
      - 使用方式与NgClass相同
    - [(ngModel)] 将数据双向绑定添加到 HTML 表单元素。
      - FormsModule 以使用 ngModel
      - [(ngModel)] 是一种语法糖  ngModel 指令把技术细节隐藏在其输入属性 ngModel 和输出属性 ngModelChange 的后面：
  
      ```html
      <input [(ngModel)]="currentItem.name" id="example-ngModel">
      <input [ngModel]="currentItem.name" (ngModelChange)="currentItem.name=$event" id="example-change">
      ```

  - 结构型指令 — 通过添加和移除 DOM 元素改变 DOM 布局的指令
    - NgIf
      - 不要忘了 ngIf 前面的星号（*）
      - 指令应用在宿主元素上来从 DOM 中添加或删除元素, vs display:none 区别是否保留dom中的节点
      - 如果要隐藏大型组件树，请考虑使用 NgIf 作为显示/隐藏的更有效替代方法。这销毁了它们的组件，释放了资源，从而带来更好的用户体验。
  
      ```html
        <app-item-detail *ngIf="isActive" [item]="item"></app-item-detail>
      ```

    - NgFor
      - 不要忘了 ngFor 前面的星号（*）
      - NgFor 是一个重复器指令，一种用来显示条目列表的方法
      - *ngFor 的字符串不是模板表达式 。而是一个微语法 —— 由 Angular 解释的一种小型语言

      ```html
        <div *ngFor="let item of items">{{item.name}}</div>
      ```

      - 模板输入变量
        - 宿主模版需要循环变量

        ```html
            <div *ngFor="let item of items">{{item.name}}</div>
            <app-item-detail *ngFor="let item of items" [item]="item"></app-item-detail>
        ```

        - NgFor 指令上下文中获取 index 属性

        ```html
          <div *ngFor="let item of items; let i=index">{{i + 1}} - {{item.name}}</div>
        ```

        - trackBy 标示可复用节点 类似 React key属性

        ```js
          trackByItems(index: number, item: Item): number { return item.id; }
          <div *ngFor="let item of items; trackBy: trackByItems">
            ({{item.id}}) {{item.name}}
          </div>
        ```

    - NgSwitch
      - 类似于 JavaScript switch 语句
      - 是三个协作指令的集合： NgSwitch ， NgSwitchCase 和 NgSwitchDefault
  
      ```html
        <div [ngSwitch]="currentItem.feature">
          <app-stout-item    *ngSwitchCase="'stout'"    [item]="currentItem"></app-stout-item>
          <app-device-item   *ngSwitchCase="'slim'"     [item]="currentItem"></app-device-item>
          <app-lost-item     *ngSwitchCase="'vintage'"  [item]="currentItem"></app-lost-item>
          <app-best-item     *ngSwitchCase="'bright'"   [item]="currentItem"></app-best-item>
          <app-unknown-item  *ngSwitchDefault           [item]="currentItem"></app-unknown-item>
        </div>
      ```

- 生命周期（按执行顺序排列）:更新顺序：
  - ngOnChanges
    - 执行时机：在 ngOnInit() 之前以及所绑定的一个或多个输入属性的值发生变化时都会调用。
  - ngOnInit
    - 初始化
    - 在第一轮 ngOnChanges() 完成之后调用
    - 只调用一次。
  - ngDoCheck
    - 脏值检测不见与ngOnChanges同时存在
  - ngAfterContentInit
    - 外部投影(类似React的children&vue的插槽)插入视图之后调用
    - 第一次 ngDoCheck() 之后调用，只调用一次。
  - ngAfterContentChecked
    - 每当 Angular 完成被投影组件内容的变更检测之后调用。
    - ngAfterContentInit() 和每次 ngDoCheck() 之后调用
  - ngAfterViewInit
    - 初始化完组件视图及其子视图之后调用
    - 第一次 ngAfterContentChecked() 之后调用，只调用一次。
  - ngAfterViewChecked
    - 做完组件视图和子视图的变更检测之后调用。
    - ngAfterViewInit() 和每次 ngAfterContentChecked() 之后调用。
  - ngOnDestroy
    - 销毁指令/组件之前调用
  
  ```js
      export class ParentComponentComponent{
         ngOnChanges(){
            console.log('Parent- ngOnChanges')
          }
          ngOnInit() {
            console.log('Parent -  ngOnInit')
          }
          ngDoCheck(){
            console.log('Parent- ngDoCheck')
          }
          ngAfterContentInit(){
            console.log('Parent - ngAfterContentInit')
          }
          ngAfterContentChecked(){
            console.log('Parent- ngAfterContentChecked')
          }
          ngAfterViewInit(){
            console.log('Parent - ngAfterViewInit')
          }
          ngAfterViewChecked(){
            console.log('Parent - ngAfterViewChecked')
          }
      }
      /*
      parent-component.component.ts:17 Parent -  ngOnInit
      parent-component.component.ts:20 Parent- ngDoCheck
      child-component.component.ts:16 Child -  ngOnInit
      child-component.component.ts:19 Child- ngDoCheck
      child-component.component.ts:22 Child - ngAfterContentInit
      child-component.component.ts:25 Child- ngAfterContentChecked
      parent-component.component.ts:23 Parent - ngAfterContentInit
      parent-component.component.ts:26 Parent- ngAfterContentChecked
      child-component.component.ts:28 Child - ngAfterViewInit
      child-component.component.ts:31 Child - ngAfterViewChecked
      parent-component.component.ts:29 Parent - ngAfterViewInit
      parent-component.component.ts:32 Parent - ngAfterViewChecked
      parent-component.component.ts:20 Parent- ngDoCheck
      child-component.component.ts:19 Child- ngDoCheck
      child-component.component.ts:25 Child- ngAfterContentChecked
      parent-component.component.ts:26 Parent- ngAfterContentChecked
      child-component.component.ts:31 Child - ngAfterViewChecked
      parent-component.component.ts:32 Parent - ngAfterViewChecked
      */

  ```

- 模版
  - @ViewChildren 批量获取DOM对象 @ViewChild获取单个DOM对象
  - 属性装饰器，用于配置一个视图查询。
  - 在调用 NgAfterViewInit 回调函数之前就会设置这些视图查询。
  - 支持下列选择器：
    - 任何带有 @Component 或 @Directive 装饰器的类
    - 字符串形式的模板引用变量（比如可以使用 @ViewChild('cmp') 来查询 <my-component #cmp></my-component>
    - 组件树中任何当前组件的子组件所定义的提供商（比如 @ViewChild(SomeService) someService: SomeService ）
    - TemplateRef（比如可以用 @ViewChild(TemplateRef) template; 来查询 <ng-template></ng-template>）

  ```js
    import {
      Component,
      OnInit,
      Input,
      ViewChild,
      ElementRef,
      Renderer2,
      AfterViewInit,
    } from '@angular/core';

    export class ImageSliderComponent implements OnInit, AfterViewInit, OnDestroy {
      @Input() sliders: ImageSlider[] = [];
      @Input() sliderHeight = '160px';
      @Input() intervalBySeconds = 2;
      @ViewChild('imageSlider', { static: true })
      imgSlider: ElementRef;
      selectedIndex = 0;
      constructor(private rd2: Renderer2) {}
      intervalId;
      ngOnInit() {}

      ngAfterViewInit(): void {
        if (this.intervalBySeconds <= 0) {
          return;
        }
        this.intervalId = setInterval(() => {
          this.rd2.setProperty(
            this.imgSlider.nativeElement,
            'scrollLeft',
            (this.getIndex(++this.selectedIndex) *
              this.imgSlider.nativeElement.scrollWidth) /
              this.sliders.length
          );
        }, this.intervalBySeconds * 1000);
      }
    }

  ```

- 注解
  - 装饰器是一种特殊类型的声明，它能够被附加到类声明、方法、属性或参数上，可以修改类的行为
  - 常见的装饰器有类装饰器、属性装饰器、方法装饰器和参数装饰器
  - 装饰器的写法分为普通装饰器和装饰器工厂
  - 类装饰器在类声明之前声明，用来监视、修改或替换类定义
  - 属性装饰器表达式会在运行时当作函数被调用，传入下列2个参数
    - 属性装饰器用来装饰属性
      - 第一个参数对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
      - 第二个参数是属性的名称
    - 属性装饰器用来装饰方法
      - 第一个参数对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
      - 第二个参数是方法的名称
      - 第三个参数是方法描述符

    ```js
      function upperCase(target: any, propertyKey: string) {
          let value = target[propertyKey];
          const getter = function () {
              return value;
          }
          const setter = function (newVal: string) {
              value = newVal.toUpperCase()
          };
          if (delete target[propertyKey]) {
              Object.defineProperty(target, propertyKey, {
                  get: getter,
                  set: setter,
                  enumerable: true,
                  configurable: true
              });
          }
      }
      function noEnumerable(target: any, property: string, descriptor: PropertyDescriptor) {
          console.log('target.getName', target.getName);
          console.log('target.getAge', target.getAge);
          descriptor.enumerable = true;
      }
      class Person {
          @upperCase
          name: string = 'typescript'
          public static age: number = 10
          @upperCase
          public static addr: string = 'nj'
          constructor() { }
          @noEnumerable
          getName() {
              console.log(this.name);
          }
      }
    ```

    - 参数装饰器
      - 会在运行时当作函数被调用，可以使用参数装饰器为类的原型增加一些元数据
      - 第1个参数对于静态成员是类的构造函数，对于实例成员是类的原型对象
      - 第2个参数的名称
      - 第3个参数在函数列表中的索引

    ```js
      function addAge(target: any, methodName: string, paramsIndex: number) {
        console.log(target);
        console.log(methodName);
        console.log(paramsIndex);
        target.age = 10;
      }
      class Person {
          login(username: string, @addAge password: string) {
              console.log(this.age, username, password);
          }
      }
    ```

- 模块
  - 概念
    - React&vue的应用是组件化，有容器组件、功能组件、展示组件等分类组织代码，而Angular是在这些组件之上建立一个模块的概念
    - Angular 应用是模块化的，它拥有自己的模块化系统，称作 NgModule。
    - 一个 NgModule 就是一个容器，用于存放一些内聚的代码块，这些代码块专注于某个应用领域、某个工作流或一组紧密相关的功能。
    - 它可以包含一些组件、服务提供者或其它代码文件，其作用域由包含它们的 NgModule 定义。 它还可以导入一些由其它模块中导出的功能，并导出一些指定的功能供其它 NgModule 使用。
  - NgModule 和组件的关系
    - NgModule 为其中的组件提供了一个编译上下文环境。根模块总会有一个根组件，并在引导期间创建它。
    - 但是，任何模块都能包含任意数量的其它组件，这些组件可以通过路由器加载，也可以通过模板创建。
    - 那些属于这个 NgModule 的组件会共享同一个编译上下文环境。
    - 组件及其模板共同定义视图，组件还可以包含视图层次结构，视图结构通过主视图嵌套产生
  - NgModule 和 JavaScript 的模块
    - JavaScript 中，每个文件是一个模块，文件中定义的所有对象都从属于那个模块。
    - NgModule 系统与 JavaScript（ES2015）用来管理 JavaScript 对象的模块系统不同，而且也没有直接关联
- 路由
  - 配置
    - 每个带路由的 Angular 应用都有一个Router（路由器）服务的单例对象
    - 在根模块 AppRoutingModule 中调用 RouterModule.forRoot()（如果在 AppModule 中注册应用的顶层路由，那就在 AppModule 中调用）。
    - 在其它模块中，你就必须调用RouterModule.forChild方法来注册附属路由
    - 每个 Route 都会把一个 URL 的 path 映射到一个组件
    - *注意，path 不能以斜杠（/）开头
  - 路由出口
    - RouterOutlet 是一个来自路由模块中的指令，它的用法类似于组件。
    - 它扮演一个占位符的角色，用于在模板中标出一个位置，路由器将会把要显示在这个出口处的组件显示在这里。

    ```html
    <router-outlet></router-outlet>
    ```

  - 路由参数

  ```js
    //从路由器（router）包中导入 Router、ActivatedRoute 和 Params 类。
    //路径参数
    ngOnInit() {
      this.hero$ = this.route.paramMap.pipe(
        switchMap((params: ParamMap) =>
          this.service.getHero(params.get('id')))
      );
    }
    //查询参数
    ngOnInit() {
      // Capture the session ID if available
      this.sessionId = this.route
        .queryParamMap
        .pipe(map(params => params.get('session_id') || 'None'));

      // Capture the fragment if available
      this.token = this.route
        .fragment
        .pipe(map(fragment => fragment || 'None'));
    }
  ```

  - 路由跳转
    - 命令式的从一个组件导航到另一个
    - 路由的 navigate 方法同样接受一个单条目的链接参数数组

    ```js
      gotoHeroes() {
        this.router.navigate(['/heroes']);
      }
      //路径参数
      gotoHeroes(hero: Hero) {
        let heroId = hero ? hero.id : null;
        // Pass along the hero id if available
        // so that the HeroList component can select that hero.
        // Include a junk 'foo' property for fun.
        this.router.navigate(['/heroes', { id: heroId, foo: 'foo' }]);
      }
      //路由参数
      this.router.navigate(['../', { id: crisisId, foo: 'foo' }], { relativeTo: this.route });
    ```

- 管道
  - 处理模版中相同数据的方法公用，类似css的处理
  - 通过引入 Angular 管道（一种编写"从显示到值"转换逻辑的途径），你可以把它声明在 HTML 中。
  - 管道进行参数化
  - 可以在管道名后面添加一个冒号( : )再跟一个参数值，来为管道添加参数(比如 currency:'EUR')。
  - 如果这个管道可以接受多个参数，那么就用冒号来分隔这些参数值(比如 slice:1:5)。
  
  ```html
     <h3 class="price">{{ product.price | currency: 'CNY' }}</h3>
  ```
  
  - 链式管道

  ```html
    <h1> The chained hero's birthday is{ birthday | date | uppercase}}</h1>
  ```
  
  - 自定义管道

  ```js
    import { Pipe, PipeTransform } from '@angular/core';
    /*
    * Raise the value exponentially
    * Takes an exponent argument that defaults to 1.
    * Usage:
    *   value | exponentialStrength:exponent
    * Example:
    *   {{ 2 | exponentialStrength:10 }}
    *   formats to: 1024
    */
    @Pipe({name: 'exponentialStrength'})
    export class ExponentialStrengthPipe implements PipeTransform {
      transform(value: number, exponent?: number): number {
        return Math.pow(value, isNaN(exponent) ? 1 : exponent);
      }
    }
  ```

- 依赖注入&服务
  - 例：
    - 订单中的产品是Product实例
    - 每当new purchaseOrder的时候需要知道Product所需要的参数，每当Product的入参发生改变的时候purchaseOrder都要随着更该
    - 为了避免修改purchaseOrder，purchaseOrder中不再负责实例
    - angular提供了Injector来维护依赖的方案

  ```js
    class Product{
      constructor(private name:string,color:string){}
    }
    // 订单 依赖Product类
    class purchaseOrder{
      constructor(private Product:Product){
        // this.product=new Product('黑米’) 需要知道Product的如参数
    }
    const token=new InjectorToken<string>('baseUrl')
    //维护依赖
    const injector=Injector.create({
      providers:[
        {
          provide:Product,//标示符
          useClass:Product,
          useFactory:()=>{
            return new Product('黑米',‘黑色’)
          }
        },
        {
          provide:purchaseOrder,//标示符
          useClass:purchaseOrder,
          deps:[Product]
        },
        {
          // provide:'baseUrl',//避免冲突
          provide:token,//避免冲突
          useValue:'127.0.0.1'
        }
      ]
    })
    console.log(injector.get(purchaseOrder))
  ```

- rxjs‘
  - 流的种类：无限 有限 单个 空
  - 流的状态： next error complete=> subscribe(next,error,complete)
  - 所有的操作都是异步的
  - 操作符
    - fillter
    - map
    - ng集成rxjs提供了async管道 ：流类型变量=>async 管道(惰性组件、unsubscribe)
