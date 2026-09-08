//
//  Course.swift
//  plannerios
//
//  Created by Nathan Wiebe on 9/8/26.
//

import SwiftUI

struct Course: View {
    
    let id: Int
    let name: String
    let number: String
    
    var body: some View {
        Text(/*@START_MENU_TOKEN@*/"Hello, World!"/*@END_MENU_TOKEN@*/)
    }
}

#Preview {
    Course(id: 1, name: "Data Structures and Algorithms", number: "CSCI161")
}
