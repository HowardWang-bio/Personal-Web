// 移动端导航菜单控制
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const mainMenu = document.getElementById('mainMenu');
    const overlay = document.getElementById('overlay');
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    // 切换菜单显示/隐藏
    menuToggle.addEventListener('click', function() {
        mainMenu.classList.toggle('active');
        overlay.classList.toggle('active');
    });
    
    // 点击遮罩关闭菜单
    overlay.addEventListener('click', function() {
        mainMenu.classList.remove('active');
        overlay.classList.remove('active');
        // 关闭所有打开的下拉菜单
        document.querySelectorAll('.dropdown.active').forEach(function(item) {
            item.classList.remove('active');
        });
    });
    
    // 在移动端点击下拉菜单标题时展开/收起子菜单
    dropdownToggles.forEach(function(toggle) {
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 991) {
                e.preventDefault();
                const parent = this.parentElement;
                parent.classList.toggle('active');
            }
        });
    });
    
    // 窗口大小改变时，如果切换到桌面视图，关闭移动菜单
    window.addEventListener('resize', function() {
        if (window.innerWidth > 991) {
            mainMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.querySelectorAll('.dropdown.active').forEach(function(item) {
                item.classList.remove('active');
            });
        }
    });
}); 